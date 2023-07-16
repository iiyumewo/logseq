- $$
  y_k = \frac{exp(a_k)}{\sum\limits_{i=1}^{n}exp(a_i)}
  $$
- ```python
  def softmax(a):
    exp_a = np.exp(a)
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a
    return y
  ```
- ![image.png](../assets/image_1689488631547_0.png){:height 291, :width 754}
-
- 如上所示，softmax函数的输出是0*.*0到1*.*0之间的实数。并且，softmax函数的输出值的总和是1。输出总和为1是softmax函数的一个重要性质。正因为有了这个性质，我们才可以把softmax函数的输出解释为“概率”。
-
- softmax 函数有什么意义？既然最后总是选最大概率的，那为什么不直接用 max 函数？