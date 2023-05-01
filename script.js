function calculateMinCost() {
  let ropes = document.getElementById("rope-lengths").value.split(",");
  ropes = ropes.map(Number);
  let n = ropes.length;

  // Create a min heap of all ropes
  let minHeap = new MinHeap();
  for (let i = 0; i < n; i++) {
    minHeap.insert(ropes[i]);
  }

  // Calculate the minimum cost to connect all ropes
  let result = 0;
  while (minHeap.size() > 1) {
    let min1 = minHeap.extractMin();
    let min2 = minHeap.extractMin();
    let sum = min1 + min2;
    result += sum;
    minHeap.insert(sum);
  }

  document.getElementById("result").innerHTML = "Minimum cost to connect ropes: " + result;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  extractMin() {
    if (this.size() === 0) {
      return null;
    }
    let min = this.heap[0];
    let last = this.heap.pop();
    if (this.size() > 0) {
      this.heap[0] = last;
      this.bubbleDown();
    }
    return min;
  }

  bubbleUp() {
    let index = this.size() - 1;
    while (index > 0) {
      let element = this.heap[index];
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];
      if (parent <= element) {
        break;
      }
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    let size = this.size();
    while (index < size) {
      let element = this.heap[index];
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild = leftChildIndex < size ? this.heap[leftChildIndex] : Infinity;
      let rightChild = rightChildIndex < size ? this.heap[rightChildIndex] : Infinity;
      let minChild = Math.min(leftChild, rightChild);
      if (minChild > element) {
        break;
      }
      let minChildIndex = leftChild <= rightChild ? leftChildIndex : rightChildIndex;
      this.heap[index] = minChild;
      this.heap[minChildIndex] = element;
      index = minChildIndex;
    }
  }
}
