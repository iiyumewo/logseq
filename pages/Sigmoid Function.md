-
- $$h(x) = \frac{1}{1+exp(-x)}$$
- ```python
  def sigmoid(x):
    return 1 / (1 + np.exp(-x))
  ```
- 与阶跃函数图形的对比
- ![image.png](../assets/image_1689485951235_0.png)
-
- 阶跃函数和sigmoid函数还有其他共同点，就是两者均为**非线性函数**。
-
-