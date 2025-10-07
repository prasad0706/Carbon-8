// Demonstration of data structures usage in the CarbonSense application

const {
  LinkedList,
  Stack,
  Queue,
  BinarySearchTree,
  MaxHeap,
  Graph
} = require('./dataStructures');

// Demo function to show how data structures are used
const demonstrateDataStructures = () => {
  console.log('=== CarbonSense Data Structures Demo ===\n');

  // 1. Linked List for History Tracking
  console.log('1. Linked List - History Tracking:');
  const historyList = new LinkedList();
  
  // Add some calculation records
  historyList.append({ id: 1, footprint: 120, date: '2023-01-15' });
  historyList.append({ id: 2, footprint: 95, date: '2023-02-15' });
  historyList.append({ id: 3, footprint: 110, date: '2023-03-15' });
  
  console.log('History records:', historyList.toArray());
  console.log('Total records:', historyList.getSize());
  console.log();

  // 2. Stack for Undo Operations
  console.log('2. Stack - Undo Operations:');
  const undoStack = new Stack();
  
  // Perform some actions
  undoStack.push('Added electricity data');
  undoStack.push('Added transport data');
  undoStack.push('Calculated footprint');
  
  console.log('Actions performed:');
  while (!undoStack.isEmpty()) {
    console.log('- ', undoStack.pop());
  }
  console.log();

  // 3. Queue for Temporary Result Caching
  console.log('3. Queue - Temporary Result Caching:');
  const resultQueue = new Queue();
  
  // Add calculation results
  resultQueue.enqueue({ userId: 1, result: 120 });
  resultQueue.enqueue({ userId: 2, result: 95 });
  resultQueue.enqueue({ userId: 3, result: 110 });
  
  console.log('Processing results:');
  while (!resultQueue.isEmpty()) {
    const result = resultQueue.dequeue();
    console.log(`User ${result.userId}: ${result.result} kg CO2`);
  }
  console.log();

  // 4. Binary Search Tree for Sorting Footprints
  console.log('4. Binary Search Tree - Sorting Footprints:');
  const bst = new BinarySearchTree();
  
  // Insert footprint values
  const footprints = [120, 95, 110, 80, 150, 75, 130];
  footprints.forEach(fp => bst.insert(fp));
  
  console.log('Sorted footprints (in-order traversal):', bst.inorder());
  console.log();

  // 5. Max Heap for Leaderboard Ranking
  console.log('5. Max Heap - Leaderboard Ranking:');
  const leaderboardHeap = new MaxHeap();
  
  // Add user scores (negative because lower footprint = better rank)
  const scores = [-120, -95, -110, -80, -150, -75, -130];
  scores.forEach(score => leaderboardHeap.insert(score));
  
  console.log('Leaderboard rankings (highest scores first):');
  while (!leaderboardHeap.isEmpty()) {
    console.log('Score:', -leaderboardHeap.extractMax()); // Convert back to positive
  }
  console.log();

  // 6. Graph for Activity Connections
  console.log('6. Graph - Activity Connections:');
  const activityGraph = new Graph();
  
  // Add activities and their connections
  activityGraph.addVertex('Driving');
  activityGraph.addVertex('Electricity');
  activityGraph.addVertex('Diet');
  activityGraph.addVertex('Waste');
  activityGraph.addVertex('Water');
  
  // Connect related activities
  activityGraph.addEdge('Driving', 'Electricity'); // Both related to energy
  activityGraph.addEdge('Diet', 'Waste'); // Food waste connection
  activityGraph.addEdge('Water', 'Electricity'); // Water heating uses electricity
  
  console.log('Activity connections (BFS from Driving):', activityGraph.bfs('Driving'));
  console.log('Activity connections (DFS from Diet):', activityGraph.dfs('Diet'));
};

// Run the demo
demonstrateDataStructures();

module.exports = { demonstrateDataStructures };