- [一张图搞懂归并排序](https://zhuanlan.zhihu.com/p/113133480)
- ![v2-5c2468d44ba7576f68caa077b72d6c66_b.gif](../assets/v2-5c2468d44ba7576f68caa077b72d6c66_b_1670988292816_0.gif)
-
- ![v2-3d1a7724af776f34bc47298e8eaa4d60_1440w.jpg](../assets/v2-3d1a7724af776f34bc47298e8eaa4d60_1440w_1671006227024_0.jpg)
-
-
- 递归实现 & 循环实现
-
- ```JavaScript
  function mergeSort(arr) {
    if (arr.length === 1) return arr
  
    const middle = arr.length >> 1
    const left = arr.slice(0, middle)
    const right = arr.slice(middle)
  
    return merge(mergeSort(left), mergeSort(right))
  }
  
  function merge(left, right) {
    let result = []
    let indexLeft = 0
    let indexRight = 0
  
    while (indexLeft < left.length && indexRight < right.length) {
      if (left[indexLeft] < right[indexRight]) {
        result.push(left[indexLeft])
        indexLeft++
      } else {
        result.push(right[indexRight])
        indexRight++
      }
    }
  
    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
  }
  ```
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-