- $$
  h(x) = 
  \begin{cases}
  x & (x > 0) \\
  0 & (x \le 0) \\
  \end{cases}
  $$
- ```python
  def relu(x):
    return np.maximum(0, x)
  ```
- ![image.png](../assets/image_1689487319911_0.png)