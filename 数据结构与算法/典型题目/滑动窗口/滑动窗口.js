// 题目描述：给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
// 示例: 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]

// 解释: 滑动窗口的位置
// ---------------
// [1 3 -1] -3 5 3 6 7
// 1 [3 -1 -3] 5 3 6 7
// 1 3 [-1 -3 5] 3 6 7
// 1 3 -1 [-3 5 3] 6 7
// 1 3 -1 -3 [5 3 6] 7
// 1 3 -1 -3 5 [3 6 7]

// 最大值分别对应：
// 3 3 5 5 6 7

// 可以这样理解
// 滑动会导致两件事，一个是左边出去了，一个是右边进来了，
// 左边出去的时候判断它在不在队头，在的话就把它移出去
// 右边进来的时候判断它是不是比队尾大，大的话就把队尾元素删掉，再循环判断（可以理解为：后面已经来了一个大的了，它不走，前面比它小的就没用了）
// 小的话就放后面去（万一哪天它有了出头之日）
function maxSlidingWindow(nums, k) {
  let rs = []
  let deque = [] // 这里可以存下标也可以存值，存下标的话就判断是否在窗口外
  for(let i = 0; i < nums.length; i++) {
    if (i >= k) { // 在滑动窗口之外的直接从队头删掉
      if (deque.length && deque[0] === nums[i - k]) deque.shift()
    }
    while(deque.length && deque[deque.length - 1] < nums[i]) deque.pop() // 如果新加进来的数比单调队列中原来的数都要大，则直接弹出队列中的其他数
    deque.push(nums[i])
    if (i >= k - 1) rs.push(deque[0])
  }
  return rs
}

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))
