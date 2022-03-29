// 前序遍历递归
var preorderTraversal = function(root) {
    let ans = [];
    if(root == null) return ans;
    ans  = ans.push(root.val);
    ans  = ans.concat(preorderTraversal(root.left));
    ans  = ans.concat(preorderTraversal(root.right));
    return ans;
};
// 前序遍历非递归
var preorderTraversal = function(root) {
    let stack = [], ans = [];
    if(root == null) return ans;
    while(root || stack.length){
        while(root!=null){
            ans.push(root.val);
            stack.push(root);
            root = root.left;
        }
        root = stack.pop().right;
    }
    return ans;
};
// 中序遍历递归
var inorderTraversal = function(root) {
    // dfs
    if(root == null) return [];
    let ans = [];
    ans = ans.concat(inorderTraversal(root.left))
    ans.push(root.val)
    ans = ans.concat(inorderTraversal(root.right))
    return ans;
};
// 中序遍历非递归
var inorderTraversal = function(root) {
    // dfs
    let stack = [];
    let ans = [];
    while(root||stack.length){
        // 走到底(有左子树就一直往左边)
        while(root){
            stack.push(root);
            root = root.left;
        }
        // 没有左子树了 把当前节点入栈 再找右子树
        root = stack.pop();
        ans.push(root.val);
        // 向右找
        root = root.right;
    }
    return ans;
};
// 后序遍历递归
var postorderTraversal = function(root) {
    if(root == null) return [];
    let ans = [];
    ans = ans.concat(postorderTraversal(root.left))
    ans = ans.concat(postorderTraversal(root.right))
    ans.push(root.val)
    return ans;
};
// 后序遍历非递归
var postorderTraversal = function(root) {
    let stack = [], ans = [];
    while(root || stack.length){
        while(root){
            ans.unshift(root.val);
            stack.push(root)
            root = root.right;
        }
        root = stack.pop().left;
    }
    return ans
};
// 后序遍历非递归
var postorderTraversal = function(root) {
    let stack1 = [root], stack2 = [], ans = [];
    while(stack1.length){
        root = stack1.pop();
        if(root){
            stack2.push(root.val);
            stack1.push(root.left);
            stack1.push(root.right);
        }
    }
    while(stack2.length){
        ans.push(stack2.pop());
    }
    return ans
};
