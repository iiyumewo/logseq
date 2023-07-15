- https://zhuanlan.zhihu.com/p/149596780
-
- ```JavaScript
  function quickSort(arr, start, end) {
    if (end - start < 1) return
    const pivot = arr[start]
    arr[start] = undefined
    let index_l = start
    let index_r = end
    while(index_l !== index_r) {
      if (arr[index_l] === undefined) {
        if (arr[index_r] > pivot) {
          index_r -= 1
        } else {
          arr[index_l] = arr[index_r]
          arr[index_r] = undefined
          index_l += 1
        } 
      } else if (arr[index_r] === undefined) {
        if (arr[index_l] <= pivot) {
          index_l += 1
        } else {
          arr[index_r] = arr[index_l]
          arr[index_l] = undefined
          index_r -= 1
        }      
      }
    }
    arr[index_l] = pivot
    quickSort(arr, start, index_l - 1)
    quickSort(arr, index_l + 1, end)
  }
  ```
-
- 1. 原地排序，对 [[空间局部性 Spatial Locality 时间局部性 Temporal Locality]] 利用性高
  2. 不稳定排序
  3. 时间复杂度主要依赖数组数据随机性，最优 O(nlogn)，最坏 O(n^2)
  4. 空间复杂度主要来自于递归函数栈的使用，最优 O(logn)，最坏 O(n)
-