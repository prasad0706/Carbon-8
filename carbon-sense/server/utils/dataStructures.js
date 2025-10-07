// Implementation of data structures used in the application

// Linked List implementation for history tracking
class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Add element to the end of the list
  append(data) {
    const newNode = new ListNode(data);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.size++;
  }

  // Add element to the beginning of the list
  prepend(data) {
    const newNode = new ListNode(data);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    
    this.size++;
  }

  // Remove element from the beginning
  removeFirst() {
    if (!this.head) return null;
    
    const data = this.head.data;
    
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    
    this.size--;
    return data;
  }

  // Convert to array
  toArray() {
    const result = [];
    let current = this.head;
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    return result;
  }

  // Get size
  getSize() {
    return this.size;
  }
}

// Stack implementation for undo operations
class Stack {
  constructor() {
    this.items = [];
  }

  // Push element to stack
  push(element) {
    this.items.push(element);
  }

  // Pop element from stack
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }

  // Peek at top element
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get size
  size() {
    return this.items.length;
  }
}

// Queue implementation for temporary result caching
class Queue {
  constructor() {
    this.items = [];
  }

  // Enqueue element
  enqueue(element) {
    this.items.push(element);
  }

  // Dequeue element
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  // Peek at front element
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  // Check if queue is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get size
  size() {
    return this.items.length;
  }
}

// Binary Search Tree implementation for sorting footprints
class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert node
  insert(data) {
    this.root = this.insertNode(this.root, data);
  }

  insertNode(node, data) {
    if (!node) {
      return new TreeNode(data);
    }

    if (data < node.data) {
      node.left = this.insertNode(node.left, data);
    } else {
      node.right = this.insertNode(node.right, data);
    }

    return node;
  }

  // In-order traversal
  inorder() {
    const result = [];
    this.inorderTraversal(this.root, result);
    return result;
  }

  inorderTraversal(node, result) {
    if (node) {
      this.inorderTraversal(node.left, result);
      result.push(node.data);
      this.inorderTraversal(node.right, result);
    }
  }
}

// Max Heap implementation for leaderboard ranking
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Get parent index
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  // Get left child index
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }

  // Get right child index
  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  // Swap elements
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // Insert element
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  // Heapify up
  heapifyUp(index) {
    if (index === 0) return;

    const parentIndex = this.getParentIndex(index);

    if (this.heap[parentIndex] < this.heap[index]) {
      this.swap(parentIndex, index);
      this.heapifyUp(parentIndex);
    }
  }

  // Extract max
  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return max;
  }

  // Heapify down
  heapifyDown(index) {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);
    let largest = index;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex] > this.heap[largest]
    ) {
      largest = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] > this.heap[largest]
    ) {
      largest = rightChildIndex;
    }

    if (largest !== index) {
      this.swap(index, largest);
      this.heapifyDown(largest);
    }
  }

  // Get size
  size() {
    return this.heap.length;
  }

  // Is empty
  isEmpty() {
    return this.heap.length === 0;
  }
}

// Graph implementation for activity connections
class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  // Add vertex
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  // Add edge
  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList.has(vertex1)) {
      this.addVertex(vertex1);
    }
    
    if (!this.adjacencyList.has(vertex2)) {
      this.addVertex(vertex2);
    }
    
    this.adjacencyList.get(vertex1).push(vertex2);
    this.adjacencyList.get(vertex2).push(vertex1);
  }

  // BFS traversal
  bfs(startingNode) {
    const visited = new Set();
    const queue = [startingNode];
    const result = [];

    visited.add(startingNode);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      result.push(currentNode);

      const neighbors = this.adjacencyList.get(currentNode);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }

  // DFS traversal
  dfs(startingNode) {
    const visited = new Set();
    const result = [];
    this.dfsHelper(startingNode, visited, result);
    return result;
  }

  dfsHelper(node, visited, result) {
    visited.add(node);
    result.push(node);

    const neighbors = this.adjacencyList.get(node);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        this.dfsHelper(neighbor, visited, result);
      }
    }
  }
}

module.exports = {
  LinkedList,
  Stack,
  Queue,
  BinarySearchTree,
  MaxHeap,
  Graph
};