//1.冒泡排序
var sortArray = function (nums) {
  //外循环
  for (let i = 0; i < nums.length; i++) {
    //内循环，右边最大
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j + 1] < nums[j]) {
        let temp
        temp = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = temp
      }
    }
  }
  return nums
};

//2.快速排序
var sortArray = function (nums) {
  if (nums.length < 2) return nums;
  // 传入有效范围
  return quickSort(nums, 0, nums.length - 1);
};

function quickSort (nums, left, right) {
  //右标小于等于左标 停止
  if (left >= right) return;
  //查找分块的中界线
  let pivotIndex = partition(nums, left, right)
  quickSort(nums, left, pivotIndex - 1)
  quickSort(nums, pivotIndex + 1, right)
  return nums;
}

function partition (nums, left, right) {
  //右边的第一个数作为中界线
  let pivot = right;
  // 从左边开始
  let leftIndex = left;
  for (let i = left; i < right; i++) {
    if (nums[i] < nums[pivot]) {
      //对比中界线和当前nums，如果符合条件，交换到左边标记，标记右移
      [nums[leftIndex], nums[i]] = [nums[i], nums[leftIndex]];
      leftIndex++;
    }
  }
  //把中界线移到左标记位置，返回
  [nums[leftIndex], nums[pivot]] = [nums[pivot], nums[leftIndex]];
  return leftIndex;
}

//3.插入排序
var sortArray = function (nums) {
  // 第一位已经定下来了，从第二位开始比较
  for (let i = 1; i < nums.length; i++) {
    //保存比较的数字
    let temp = nums[i]
    let j = i - 1
    //向前比较
    for (; j > -1; j--) {
      if (temp >= nums[j]) break
      //如果比较的数大，就一直移动
      nums[j + 1] = nums[j]
    }
    nums[j + 1] = temp
  }
  return nums
};

//4.希尔排序
var sortArray = function (nums) {
  let len = nums.length
  //定义初始跨度
  let gap = parseInt(len / 2)
  //跨度不为0
  while (gap) {
    //比较从gap开始
    for (let i = gap; i < len; i++) {
      let j = i - gap
      let temp = nums[i]
      //根据跨度比较
      for (; j >= 0; j -= gap) {
        if (temp >= nums[j]) break
        nums[j + gap] = nums[j]
      }
      nums[j + gap] = temp
    }
    //gap/2
    gap = parseInt(gap / 2)
  }
  return nums
};


//5.选择排序
var sortArray = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    //记录最小的数和它的index，放到最前面去
    let min = nums[i]
    let minindex = i
    for (let j = i; j < nums.length; j++) {
      if (nums[j] < min) {
        min = nums[j]
        minindex = j
      }
    }
    [nums[i], nums[minindex]] = [nums[minindex], nums[i]]
  }
  return nums
};
