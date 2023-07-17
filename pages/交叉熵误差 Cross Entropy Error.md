- $$
  E = -\sum_k t_k \log y_k
  $$
- ```python
  def cross_entropy_error(y, t):
    delta = 1e-7
    return -np.sum(t * np.log(y + delta))
  
  >>> t = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
  >>> y = [0.1, 0.05, 0.6, 0.0, 0.05, 0.1, 0.0, 0.1, 0.0, 0.0]
  >>> cross_entropy_error(np.array(y), np.array(t))
  0.51082545709933802
  >>>
  >>> y = [0.1, 0.05, 0.1, 0.0, 0.05, 0.1, 0.0, 0.6, 0.0, 0.0]
  >>> cross_entropy_error(np.array(y), np.array(t))
  2.3025840929945458
  ```
-
-
-
-
-