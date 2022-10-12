module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [
      'plugin:vue/essential',
      // 'eslint:recommended'
    ],
    rules: {
  
      /*
       * ********************************************************************
       * eslint:recommended 重写
       * ********************************************************************
       */
  
      // 开发环境可以使用 console
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      // 开发环境可以使用 debugger
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  
      /*
       * ********************************************************************
       * Possible Errors 逻辑纠错
       * ********************************************************************
       * -------------------------
       * -------- fixable --------
       * -------------------------
       */
  
      /*
       * ------------------------
       * --- can not be fixed ---
       * ------------------------
       */
  
      /*
       * ********************************************************************
       * Best Practices 最佳实践
       * ********************************************************************
       * -------------------------
       * -------- fixable --------
       * -------------------------
       */
  
      // 在块区域前后时刻保留大括号
      "curly": "error",
      // 禁止不必要的函数绑定
      "no-extra-bind": "error",
      // 禁止浮点小数
      "no-floating-decimal": "error",
      // 禁止出现多个空格
      "no-multi-spaces": "error",
  
      /*
       * ------------------------
       * --- can not be fixed ---
       * ------------------------
       */
  
      /*
       * 使用类型安全的 === 和 !== 操作符代替 == 和 != 操作符
       * 不对 null 应用此规则
       */
      "eqeqeq": ["error", "always", {"null": "ignore"}],
      // 要求 Switch 语句中有 Default 分支
      "default-case": "error",
      // 禁用 caller 或 callee
      "no-caller": "error",
      // 禁用 eval()
      "no-eval": "error",
      // 禁用隐式的eval()
      "no-implied-eval": "error",
      // 禁止在返回语句中赋值
      "no-return-assign": "error",
      // 禁止自身比较
      "no-self-compare": "error",
      // 禁用 with 语句
      "no-with": "error",
  
      /*
       * ********************************************************************
       * Stylistic Issues 代码风格
       * ********************************************************************
       * -------------------------
       * -------- fixable --------
       * -------------------------
       */
  
      // 缩进2位, 在.vue文件中script标签特殊处理
      "indent": "off",
      "vue/script-indent": ["error", 2, {"baseIndent": 1}],
      // 在代码块中使用一致的大括号风格(one true brace style 风格)
      "brace-style": ["error", "1tbs", {"allowSingleLine": true}],
      // 在部分代码中禁止使用拖尾逗号
      "comma-dangle": ["error", {
        "arrays": "never",
        "objects": "never",
        "imports": "never",
        "exports": "never"
      }],
      // 在逗号周围使用空格
      "comma-spacing": ["error", {"before": false, "after": true}],
      // 要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
      "comma-style": ["error", "last"],
      // 要求文件末尾保留一行空行, 为可能的 Unix shell 环境做准备
      "eol-last": ["error", "always"],
      // 禁止在函数标识符和其调用之间有空格
      "func-call-spacing": ["error", "never"],
      // 如果函数的任一参数有换行，则要求在函数括号内换行, 否则禁止换行
      "function-paren-newline": ["error", "multiline"],
      // 禁止在箭头函数体之前出现换行
      "implicit-arrow-linebreak": ["error", "beside"],
      // 禁止在对象字面量的键和冒号之间存在空格, 要求在对象字面量的冒号和值之间存在至少有一个空格
      "key-spacing": ["error", {"beforeColon": false, "afterColon": true}],
      // 要求在关键字之前至少有一个空格, 要求在关键字之后至少有一个空格 (if, for, while)
      "keyword-spacing": ["error", {"before": true, "after": true}],
      // 强制使用 Unix 换行符： \n
      // "linebreak-style": ["error", "unix"],
      // 禁止使用连续的行注释来表示块注释。另外，要求块注释的每行之前有一个 *
      // "multiline-comment-style": ["error", "starred-block"],
      // 要求调用无参构造函数时带括号
      "new-parens": "error",
      // 禁止 if 语句作为唯一语句出现在 else 语句块中
      "no-lonely-if": "error",
      // 禁止混合使用不同的操作符, 使用()来分隔不同的操作符
      // "no-mixed-operators": "error",
      // 强制最大连续空行数为1
      "no-multiple-empty-lines": ["error", {"max": 1}],
      // 禁止可以表达为更简单结构的三元操作符
      "no-unneeded-ternary": "error",
      // 禁止属性前有空白
      "no-whitespace-before-property": "error",
      // 禁止单行语句之前有换行 (if、else、while、do-while 和 for)
      "nonblock-statement-body-position": ["error", "beside"],
      // 要求花括号内有空格 (除了 {})
      "object-curly-spacing": ["error", "always"],
      // 尽可能地简化赋值操作 (例如，x = x + 4 可以简化为 x += 4)
      "operator-assignment": ["error", "always"],
      // 禁止块语句和类的开始或末尾有空行
      "padded-blocks": ["error", "never"],
      // 块语句必须总是至少有一个前置空格
      "space-before-blocks": ["error", "always"],
      /*
       * 要求尽可能地使用单引号
       * 允许字符串使用反勾号
       */
      "quotes": ["error", "single", {"allowTemplateLiterals": true}],
      // 要求函数圆括号之前有一个空格
      "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "always",
        "asyncArrow": "always"
      }],
      // 强制圆括号内没有空格
      "space-in-parens": ["error", "never"],
      // 要求在注释前有空白 // 或 /* 必须跟随至少一个空白
      "spaced-comment": ["error", "always"],
      // 要求冒号之后有一个或多个空格, 禁止冒号之前有空格
      "switch-colon-spacing": ["error", {"after": true, "before": false}],
      // 要求正则表达式被包裹起来
      "wrap-regex": "error",
      // 强制在代码块中开括号前和闭括号后有空格
      "block-spacing": "error",
  
      /*
       * ------------------------
       * --- can not be fixed ---
       * ------------------------
       */
  
      // 使用骆驼拼写法
      // "camelcase": ["error", {"properties": "always"}],
      // 要求一致的 This 别名
      "consistent-this": ["error", "self"],
      // 强制行注释只在代码上方，单独成行
      // "line-comment-position": ["error", {"position": "above"}],
      // 强制块语句的最大可嵌套3层
      "max-depth": ["error", 3],
      // 强制回调函数最大可嵌套3层
      "max-nested-callbacks": ["error", 3],
      // 如果表达式跨越多个行，则在三元表达式的操作数之间强制换行
      "multiline-ternary": ["error", "always-multiline"],
      /*
       * 要求调用 new 操作符时有首字母大小的函数
       * 要求调用首字母大写的函数时有 new 操作符
       * 检查对象属性
       */
      "new-cap": ["off", {"newIsCap": true, "capIsNew": true, "properties": true}],
      // 禁止连续赋值
      "no-multi-assign": "error",
      // 禁用for...in,
      "no-restricted-syntax": ["error", "ForInStatement"],
  
      /*
       * ********************************************************************
       * ECMAScript 6
       * ********************************************************************
       * -------------------------
       * -------- fixable --------
       * -------------------------
       */
  
      // 要求箭头函数体使用大括号
      "arrow-body-style": ["error", "always"],
      // 要求箭头函数的参数使用圆括号
      "arrow-parens": ["error", "always"],
      // 要求箭头函数的箭头之前之后有空格
      "arrow-spacing": ["error", {"before": true, "after": true}],
      // 强制 generator 函数中 * 号前有空格, 后无空格 (function *generator() {})
      "generator-star-spacing": ["error", {"before": true, "after": false}],
      // 要求使用 let 或 const 而不是 var
      "no-var": "error",
      // 要求使用箭头函数作为回调
      "prefer-arrow-callback": ["error", {"allowNamedFunctions": true}],
      // 使用模板而非字符串连接 (`Hello, ${name}!`)
      "prefer-template": "error",
      // 强制在 yield* 表达式中 * 后使用空格
      "yield-star-spacing": ["error", "after"],
  
      /*
       * ------------------------
       * --- can not be fixed ---
       * ------------------------
       */
  
      // 禁止重复导入
      "no-duplicate-imports": "error"
    },
    parserOptions: {
      parser: 'babel-eslint'
    }
  };
  