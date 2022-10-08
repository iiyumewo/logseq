- `initProps`, `initSetup`, `initData`, `initComputed`, `initWatch`
-
- 1. 为什么需要 Dep 实例 
  2. 为什么需要 Dep.target 的设计
  3. 为什么 Watcher 实例需要持有 deps
  4. 怎么处理 Array 的监听
  5. computed 为什么要设计成惰性的
  6. computed watcher 与 render watcher 的区别
  7. watcher 执行什么情况下是嵌套的，也就是说 Dep.target 栈中什么时候不止一个元素
  8. 为什么 Watcher.cleanupDeps 要使用 Set.clear 而不是直接 new Set()
  9. 为什么 Watcher.cleanupDeps 要使用 [].length = 0 而不是直接 new Array()
  10. watcher 实例 持有 deps 的意义是什么
  11. 为什么 computedGetter 中，需要在计算属性计算完成后 `if (Dep.target) { watcher.depend() }`
-
- 线索
	- 1. Dep 实例跟随被监听的数据一起创建，
-
- `defineReactive` 源码
  collapsed:: true
	- ```JavaScript
	  /**
	   * Define a reactive property on an Object.
	   */
	  export function defineReactive(
	    obj: object,
	    key: string,
	    val?: any,
	    customSetter?: Function | null,
	    shallow?: boolean
	  ) {
	    const dep = new Dep()
	  
	    const property = Object.getOwnPropertyDescriptor(obj, key)
	    if (property && property.configurable === false) {
	      return
	    }
	  
	    // cater for pre-defined getter/setters
	    const getter = property && property.get
	    const setter = property && property.set
	    if (
	      (!getter || setter) &&
	      (val === NO_INIITIAL_VALUE || arguments.length === 2)
	    ) {
	      val = obj[key]
	    }
	  
	    let childOb = !shallow && observe(val)
	    Object.defineProperty(obj, key, {
	      enumerable: true,
	      configurable: true,
	      get: function reactiveGetter() {
	        const value = getter ? getter.call(obj) : val
	        if (Dep.target) {
	          if (__DEV__) {
	            dep.depend({
	              target: obj,
	              type: TrackOpTypes.GET,
	              key
	            })
	          } else {
	            dep.depend()
	          }
	          if (childOb) {
	            childOb.dep.depend()
	            if (isArray(value)) {
	              dependArray(value)
	            }
	          }
	        }
	        return isRef(value) ? value.value : value
	      },
	      set: function reactiveSetter(newVal) {
	        const value = getter ? getter.call(obj) : val
	        if (!hasChanged(value, newVal)) {
	          return
	        }
	        if (__DEV__ && customSetter) {
	          customSetter()
	        }
	        if (setter) {
	          setter.call(obj, newVal)
	        } else if (getter) {
	          // #7981: for accessor properties without setter
	          return
	        } else if (isRef(value) && !isRef(newVal)) {
	          value.value = newVal
	          return
	        } else {
	          val = newVal
	        }
	        childOb = !shallow && observe(newVal)
	        if (__DEV__) {
	          dep.notify({
	            type: TriggerOpTypes.SET,
	            target: obj,
	            key,
	            newValue: newVal,
	            oldValue: value
	          })
	        } else {
	          dep.notify()
	        }
	      }
	    })
	  
	    return dep
	  }
	  ```
- [MDN - Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- 针对对象中单个属性的监听
- ```JavaScript
  export function defineReactive(obj: object, key: string, val?: any) {
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() { return val },
      set: function reactiveSetter(newVal) { val = newVal }
    })
  }
  ```
- `class Observer` 源码
  collapsed:: true
	- ```JavaScript
	  export class Observer {
	    dep: Dep
	    vmCount: number // number of vms that have this object as root $data
	  
	    constructor(public value: any, public shallow = false) {
	      // this.value = value
	      this.dep = new Dep()
	      this.vmCount = 0
	      def(value, '__ob__', this)
	      if (isArray(value)) {
	        if (hasProto) {
	          protoAugment(value, arrayMethods)
	        } else {
	          copyAugment(value, arrayMethods, arrayKeys)
	        }
	        if (!shallow) {
	          this.observeArray(value)
	        }
	      } else {
	        this.walk(value, shallow)
	      }
	    }
	  
	    /**
	     * Walk through all properties and convert them into
	     * getter/setters. This method should only be called when
	     * value type is Object.
	     */
	    walk(obj: object, shallow: boolean) {
	      const keys = Object.keys(obj)
	      for (let i = 0; i < keys.length; i++) {
	        const key = keys[i]
	        defineReactive(obj, key, NO_INIITIAL_VALUE, undefined, shallow)
	      }
	    }
	  
	    /**
	     * Observe a list of Array items.
	     */
	    observeArray(items: Array<any>) {
	      for (let i = 0, l = items.length; i < l; i++) {
	        observe(items[i])
	      }
	    }
	  }
	  ```
- 掏出一个 Observer 实例来对一个对象执行批量属性响应化
- ```JavaScript
  export class Observer {
    constructor(public value: any) {
      value.__ob__ = this
      this.walk(value)
    }
    
    walk(obj: object) {
      const keys = Object.keys(obj)
      for (let i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i], obj[keys[i]])
      }
    }
  }
  ```
- `observe` 源码
  collapsed:: true
	- ```JavaScript
	  /**
	   * Attempt to create an observer instance for a value,
	   * returns the new observer if successfully observed,
	   * or the existing observer if the value already has one.
	   */
	  export function observe(value: any, shallow?: boolean): Observer | void {
	    if (!isObject(value) || isRef(value) || value instanceof VNode) {
	      return
	    }
	    let ob: Observer | void
	    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	      ob = value.__ob__
	    } else if (
	      shouldObserve &&
	      !isServerRendering() &&
	      (isArray(value) || isPlainObject(value)) &&
	      Object.isExtensible(value) &&
	      !value.__v_skip
	    ) {
	      ob = new Observer(value, shallow)
	    }
	    return ob
	  }
	  ```
- 逮谁观察谁
- ```JavaScript
  /**
   * Attempt to create an observer instance for a value,
   * returns the new observer if successfully observed,
   * or the existing observer if the value already has one.
   */
  export function observe(value: any): Observer | void {
    let ob: Observer | void
    if (value.__ob__ && value.__ob__ instanceof Observer) {
      ob = value.__ob__
    } else {
      ob = new Observer(value)
    }
    return ob
  }
  ```
- 现在属性已经 reactive 了，但是好像并没有什么用？我们监听属性的目的是在属性发生变化时，可以做些什么好事情。
- 直觉上来说应该放在 setter 中，这样显然不太行，因为仅仅一个变量发生改变的时候，就有很多事情需要做，页面的渲染、computed 的重算、watch api 的 callback 执行...，所以每个被监听的数据都需要一个 dep，它负责记住所有等着该数据发生变化时需要做事情的实例，在变化发生时一一通知他们”嘿该干活了“
- 思考下这样一个 dep 实例需要实现哪些功能？需要在哪些地方创建？需要被哪些对象持有？
- `class Dep` 源码
  collapsed:: true
	- ```JavaScript
	  export interface DepTarget extends DebuggerOptions {
	    id: number
	    addDep(dep: Dep): void
	    update(): void
	  }
	  
	  /**
	   * A dep is an observable that can have multiple
	   * directives subscribing to it.
	   * @internal
	   */
	  export default class Dep {
	    static target?: DepTarget | null
	    id: number
	    subs: Array<DepTarget>
	  
	    constructor() {
	      this.subs = []
	    }
	  
	    addSub(sub: DepTarget) {
	      this.subs.push(sub)
	    }
	  
	    removeSub(sub: DepTarget) {
	      remove(this.subs, sub)
	    }
	  
	    depend(info?: DebuggerEventExtraInfo) {
	      if (Dep.target) {
	        Dep.target.addDep(this)
	        if (__DEV__ && info && Dep.target.onTrack) {
	          Dep.target.onTrack({
	            effect: Dep.target,
	            ...info
	          })
	        }
	      }
	    }
	  
	    notify(info?: DebuggerEventExtraInfo) {
	      // stabilize the subscriber list first
	      const subs = this.subs.slice()
	      if (__DEV__ && !config.async) {
	        // subs aren't sorted in scheduler if not running async
	        // we need to sort them now to make sure they fire in correct
	        // order
	        subs.sort((a, b) => a.id - b.id)
	      }
	      for (let i = 0, l = subs.length; i < l; i++) {
	        if (__DEV__ && info) {
	          const sub = subs[i]
	          sub.onTrigger &&
	            sub.onTrigger({
	              effect: subs[i],
	              ...info
	            })
	        }
	        subs[i].update()
	      }
	    }
	  }
	  ```
- ```JavaScript
  export interface DepTarget {
    addDep(dep: Dep): void
    update(): void
  }
    
  export default class Dep {
    subs: Array<DepTarget>
    constructor() {
      this.subs = []
    }
    addSub(sub: DepTarget) { this.subs.push(sub) }
    removeSub(sub: DepTarget) { remove(this.subs, sub) }
    notify() {
      for (let i = 0, l = subs.length; i < l; i++) {
        subs[i].update()
      }
    }
  }
  ```
-
- `class Watcher` 源码
  collapsed:: true
	- ```JavaScript
	  /**
	   * A watcher parses an expression, collects dependencies,
	   * and fires callback when the expression value changes.
	   * This is used for both the $watch() api and directives.
	   * @internal
	   */
	  export default class Watcher implements DepTarget {
	    vm?: Component | null
	    expression: string
	    cb: Function
	    id: number
	    deep: boolean
	    user: boolean
	    lazy: boolean
	    sync: boolean
	    dirty: boolean
	    active: boolean
	    deps: Array<Dep>
	    newDeps: Array<Dep>
	    depIds: SimpleSet
	    newDepIds: SimpleSet
	    before?: Function
	    onStop?: Function
	    noRecurse?: boolean
	    getter: Function
	    value: any
	  
	    // dev only
	    onTrack?: ((event: DebuggerEvent) => void) | undefined
	    onTrigger?: ((event: DebuggerEvent) => void) | undefined
	  
	    constructor(
	      vm: Component | null,
	      expOrFn: string | (() => any),
	      cb: Function,
	      options?: WatcherOptions | null,
	      isRenderWatcher?: boolean
	    ) {
	      recordEffectScope(this, activeEffectScope || (vm ? vm._scope : undefined))
	      if ((this.vm = vm)) {
	        if (isRenderWatcher) {
	          vm._watcher = this
	        }
	      }
	      // options
	      if (options) {
	        this.deep = !!options.deep
	        this.user = !!options.user
	        this.lazy = !!options.lazy
	        this.sync = !!options.sync
	        this.before = options.before
	        if (__DEV__) {
	          this.onTrack = options.onTrack
	          this.onTrigger = options.onTrigger
	        }
	      } else {
	        this.deep = this.user = this.lazy = this.sync = false
	      }
	      this.cb = cb
	      this.id = ++uid // uid for batching
	      this.active = true
	      this.dirty = this.lazy // for lazy watchers
	      this.deps = []
	      this.newDeps = []
	      this.depIds = new Set()
	      this.newDepIds = new Set()
	      this.expression = __DEV__ ? expOrFn.toString() : ''
	      // parse expression for getter
	      if (isFunction(expOrFn)) {
	        this.getter = expOrFn
	      } else {
	        this.getter = parsePath(expOrFn)
	        if (!this.getter) {
	          this.getter = noop
	          __DEV__ &&
	            warn(
	              `Failed watching path: "${expOrFn}" ` +
	                'Watcher only accepts simple dot-delimited paths. ' +
	                'For full control, use a function instead.',
	              vm
	            )
	        }
	      }
	      this.value = this.lazy ? undefined : this.get()
	    }
	  
	    /**
	     * Evaluate the getter, and re-collect dependencies.
	     */
	    get() {
	      pushTarget(this)
	      let value
	      const vm = this.vm
	      try {
	        value = this.getter.call(vm, vm)
	      } catch (e: any) {
	        if (this.user) {
	          handleError(e, vm, `getter for watcher "${this.expression}"`)
	        } else {
	          throw e
	        }
	      } finally {
	        // "touch" every property so they are all tracked as
	        // dependencies for deep watching
	        if (this.deep) {
	          traverse(value)
	        }
	        popTarget()
	        this.cleanupDeps()
	      }
	      return value
	    }
	  
	    /**
	     * Add a dependency to this directive.
	     */
	    addDep(dep: Dep) {
	      const id = dep.id
	      if (!this.newDepIds.has(id)) {
	        this.newDepIds.add(id)
	        this.newDeps.push(dep)
	        if (!this.depIds.has(id)) {
	          dep.addSub(this)
	        }
	      }
	    }
	  
	    /**
	     * Clean up for dependency collection.
	     */
	    cleanupDeps() {
	      let i = this.deps.length
	      while (i--) {
	        const dep = this.deps[i]
	        if (!this.newDepIds.has(dep.id)) {
	          dep.removeSub(this)
	        }
	      }
	      let tmp: any = this.depIds
	      this.depIds = this.newDepIds
	      this.newDepIds = tmp
	      this.newDepIds.clear()
	      tmp = this.deps
	      this.deps = this.newDeps
	      this.newDeps = tmp
	      this.newDeps.length = 0
	    }
	  
	    /**
	     * Subscriber interface.
	     * Will be called when a dependency changes.
	     */
	    update() {
	      /* istanbul ignore else */
	      if (this.lazy) {
	        this.dirty = true
	      } else if (this.sync) {
	        this.run()
	      } else {
	        queueWatcher(this)
	      }
	    }
	  
	    /**
	     * Scheduler job interface.
	     * Will be called by the scheduler.
	     */
	    run() {
	      if (this.active) {
	        const value = this.get()
	        if (
	          value !== this.value ||
	          // Deep watchers and watchers on Object/Arrays should fire even
	          // when the value is the same, because the value may
	          // have mutated.
	          isObject(value) ||
	          this.deep
	        ) {
	          // set new value
	          const oldValue = this.value
	          this.value = value
	          if (this.user) {
	            const info = `callback for watcher "${this.expression}"`
	            invokeWithErrorHandling(
	              this.cb,
	              this.vm,
	              [value, oldValue],
	              this.vm,
	              info
	            )
	          } else {
	            this.cb.call(this.vm, value, oldValue)
	          }
	        }
	      }
	    }
	  
	    /**
	     * Evaluate the value of the watcher.
	     * This only gets called for lazy watchers.
	     */
	    evaluate() {
	      this.value = this.get()
	      this.dirty = false
	    }
	  
	    /**
	     * Depend on all deps collected by this watcher.
	     */
	    depend() {
	      let i = this.deps.length
	      while (i--) {
	        this.deps[i].depend()
	      }
	    }
	  
	    /**
	     * Remove self from all dependencies' subscriber list.
	     */
	    teardown() {
	      if (this.vm && !this.vm._isBeingDestroyed) {
	        remove(this.vm._scope.effects, this)
	      }
	      if (this.active) {
	        let i = this.deps.length
	        while (i--) {
	          this.deps[i].removeSub(this)
	        }
	        this.active = false
	        if (this.onStop) {
	          this.onStop()
	        }
	      }
	    }
	  }
	  ```
-