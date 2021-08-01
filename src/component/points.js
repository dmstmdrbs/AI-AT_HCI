//256
const points_256 = [[30, 30],
[60, 30],
[90, 30],
[120, 30],
[150, 30],
[180, 30],
[210, 30],
[240, 30],
[271, 30],
[301, 30],
[331, 30],
[361, 30],
[391, 30],
[421, 30],
[451, 30],
[481, 30],
[30, 60],
[60, 60],
[90, 60],
[120, 60],
[150, 60],
[180, 60],
[210, 60],
[240, 60],
[271, 60],
[301, 60],
[331, 60],
[361, 60],
[391, 60],
[421, 60],
[451, 60],
[481, 60],
[30, 90],
[60, 90],
[90, 90],
[120, 90],
[150, 90],
[180, 90],
[210, 90],
[240, 90],
[271, 90],
[301, 90],
[331, 90],
[361, 90],
[391, 90],
[421, 90],
[451, 90],
[481, 90],
[30, 120],
[60, 120],
[90, 120],
[120, 120],
[150, 120],
[180, 120],
[210, 120],
[240, 120],
[271, 120],
[301, 120],
[331, 120],
[361, 120],
[391, 120],
[421, 120],
[451, 120],
[481, 120],
[30, 150],
[60, 150],
[90, 150],
[120, 150],
[150, 150],
[180, 150],
[210, 150],
[240, 150],
[271, 150],
[301, 150],
[331, 150],
[361, 150],
[391, 150],
[421, 150],
[451, 150],
[481, 150],
[30, 180],
[60, 180],
[90, 180],
[120, 180],
[150, 180],
[180, 180],
[210, 180],
[240, 180],
[271, 180],
[301, 180],
[331, 180],
[361, 180],
[391, 180],
[421, 180],
[451, 180],
[481, 180],
[30, 210],
[60, 210],
[90, 210],
[120, 210],
[150, 210],
[180, 210],
[210, 210],
[240, 210],
[271, 210],
[301, 210],
[331, 210],
[361, 210],
[391, 210],
[421, 210],
[451, 210],
[481, 210],
[30, 240],
[60, 240],
[90, 240],
[120, 240],
[150, 240],
[180, 240],
[210, 240],
[240, 240],
[271, 240],
[301, 240],
[331, 240],
[361, 240],
[391, 240],
[421, 240],
[451, 240],
[481, 240],
[30, 271],
[60, 271],
[90, 271],
[120, 271],
[150, 271],
[180, 271],
[210, 271],
[240, 271],
[271, 271],
[301, 271],
[331, 271],
[361, 271],
[391, 271],
[421, 271],
[451, 271],
[481, 271],
[30, 301],
[60, 301],
[90, 301],
[120, 301],
[150, 301],
[180, 301],
[210, 301],
[240, 301],
[271, 301],
[301, 301],
[331, 301],
[361, 301],
[391, 301],
[421, 301],
[451, 301],
[481, 301],
[30, 331],
[60, 331],
[90, 331],
[120, 331],
[150, 331],
[180, 331],
[210, 331],
[240, 331],
[271, 331],
[301, 331],
[331, 331],
[361, 331],
[391, 331],
[421, 331],
[451, 331],
[481, 331],
[30, 361],
[60, 361],
[90, 361],
[120, 361],
[150, 361],
[180, 361],
[210, 361],
[240, 361],
[271, 361],
[301, 361],
[331, 361],
[361, 361],
[391, 361],
[421, 361],
[451, 361],
[481, 361],
[30, 391],
[60, 391],
[90, 391],
[120, 391],
[150, 391],
[180, 391],
[210, 391],
[240, 391],
[271, 391],
[301, 391],
[331, 391],
[361, 391],
[391, 391],
[421, 391],
[451, 391],
[481, 391],
[30, 421],
[60, 421],
[90, 421],
[120, 421],
[150, 421],
[180, 421],
[210, 421],
[240, 421],
[271, 421],
[301, 421],
[331, 421],
[361, 421],
[391, 421],
[421, 421],
[451, 421],
[481, 421],
[30, 451],
[60, 451],
[90, 451],
[120, 451],
[150, 451],
[180, 451],
[210, 451],
[240, 451],
[271, 451],
[301, 451],
[331, 451],
[361, 451],
[391, 451],
[421, 451],
[451, 451],
[481, 451],
[30, 481],
[60, 481],
[90, 481],
[120, 481],
[150, 481],
[180, 481],
[210, 481],
[240, 481],
[271, 481],
[301, 481],
[331, 481],
[361, 481],
[391, 481],
[421, 481],
[451, 481],
[481, 481]]
function pointArrToObj(points){
  let objArray=Array.from(points, point=>{
    const temp = {x:parseFloat(point[0]),y:parseFloat(point[1])}; 
    return temp
  });
  return objArray;
};

export let pointsObj = pointArrToObj(points_256);