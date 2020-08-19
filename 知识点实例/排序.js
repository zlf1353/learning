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


//5.堆排序
var sortArray = function (nums) {
  buildHeap(nums);
  // 循环n-1次，每次循环后交换堆顶元素和堆底元素并重新调整堆结构
  for (let i = nums.length - 1; i > 0; i--) {
    [nums[i], nums[0]] = [nums[0], nums[i]];
    adjustHeap(nums, 0, i);//！！！size=i
  }
  return nums
}

// 调整最大堆，使index的值大于左右节点
function adjustHeap (nums, index, size) {
  // 交换后可能会破坏堆结构，需要循环使得每一个父节点都大于左右结点
  while (true) {
    let max = index;
    let left = index * 2 + 1;   // 左节点
    let right = index * 2 + 2;  // 右节点
    //！！！left < size 
    //！！！nums[max] < nums[left]  ！！！nums[max]
    if (left < size && nums[max] < nums[left]) max = left;
    if (right < size && nums[max] < nums[right]) max = right;
    // 如果左右结点大于当前的结点则交换，并再循环一遍判断交换后的左右结点位置是否破坏了堆结构（比左右结点小了）
    if (index != max) {
      [nums[index], nums[max]] = [nums[max], nums[index]];
      index = max
    }
    else {
      break;
    }
  }
}
// 建立最大堆
function buildHeap (nums) {
  // 注意这里的头节点是从0开始的，所以最后一个非叶子结点是 parseInt(nums.length/2)-1
  let start = parseInt(nums.length / 2) - 1;
  let size = nums.length;
  // 从最后一个非叶子结点开始调整，直至堆顶。
  //!!!循环
  for (let i = start; i >= 0; i--) {
    adjustHeap(nums, i, size);
  }
}

//归并排序
var sortArray = function (nums) {
  return splitList(nums)
};
// 拆分数组
function splitList (list) {
  let len = list.length
  //！！！必须，不然报错
  if (len === 1) return list
  let mid = len >> 1
  //slice
  let left = list.slice(0, mid)
  let right = list.slice(mid)
  //！！递归调用
  return mergeList(splitList(left), splitList(right))
}
// 合并, 排序数组
function mergeList (left, right) {
  let res = []
  let il = 0, lenl = left.length
  let ir = 0, lenr = right.length
  while (il < lenl && ir < lenr) {
    if (left[il] < right[ir]) {
      res.push(left[il++])
    } else {
      res.push(right[ir++])
    }
  }
  while (il < lenl) {
    res.push(left[il++])
  }
  while (ir < lenr) {
    res.push(right[ir++])
  }
  return res
}

//7.桶排序

function countingSort (nums) {
  //求最大值最小值
  let min = Math.min(...nums)
  let max = Math.max(...nums)
  let res = []
  for (let i = 0; i < nums.length; i++) {
    res[nums[i]] = res[nums[i]] + 1 || 1
  }
  let index = 0
  //桶拿出来
  for (let i = min; i <= max; i++) {
    while (res[i] > 0) {
      nums[index++] = i
      res[i]--
    }
  }
  return nums
}