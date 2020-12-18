// Load in the Data
const data = require("./data").split("\n");
const dataSample1 = require("./sample").split("\n");

data.forEach((row, i) => {
  data[i] = row.split("");
});

dataSample1.forEach((row, i) => {
  dataSample1[i] = row.split("");
});

console.log(dataSample1);

class Point {
  constructor(z, x, y, w, active = false) {
    this.z = z;
    this.x = x;
    this.y = y;
    this.w = w;
    this.isActive = active;
  }

  get pos() {
    return { z: this.z, x: this.x, y: this.y, w: this.w };
  }

  get hash() {
    return this.makeHash();
  }

  makeHash() {
    return `z${this.z}x${this.x}y${this.y}w${this.w}`;
  }

  get neighborPoints() {
    return this.getNeighborPoints();
  }

  // returns [{z, x, y}...] for all possible points in
  // 3D space that could be neighbors
  getNeighborPoints() {
    return [
      { z: this.z - 1, x: this.x - 1, y: this.y - 1, w: this.w - 1 },
      { z: this.z - 1, x: this.x - 1, y: this.y + 0, w: this.w - 1 },
      { z: this.z - 1, x: this.x - 1, y: this.y + 1, w: this.w - 1 },
      { z: this.z - 1, x: this.x + 0, y: this.y - 1, w: this.w - 1 },
      { z: this.z - 1, x: this.x + 0, y: this.y + 0, w: this.w - 1 },
      { z: this.z - 1, x: this.x + 0, y: this.y + 1, w: this.w - 1 },
      { z: this.z - 1, x: this.x + 1, y: this.y - 1, w: this.w - 1 },
      { z: this.z - 1, x: this.x + 1, y: this.y + 0, w: this.w - 1 },
      { z: this.z - 1, x: this.x + 1, y: this.y + 1, w: this.w - 1 },
      { z: this.z + 0, x: this.x - 1, y: this.y - 1, w: this.w - 1 },
      { z: this.z + 0, x: this.x - 1, y: this.y + 0, w: this.w - 1 },
      { z: this.z + 0, x: this.x - 1, y: this.y + 1, w: this.w - 1 },
      { z: this.z + 0, x: this.x + 0, y: this.y - 1, w: this.w - 1 },
      { z: this.z + 0, x: this.x + 0, y: this.y + 0, w: this.w - 1 },
      { z: this.z + 0, x: this.x + 0, y: this.y + 1, w: this.w - 1 },
      { z: this.z + 0, x: this.x + 1, y: this.y - 1, w: this.w - 1 },
      { z: this.z + 0, x: this.x + 1, y: this.y + 0, w: this.w - 1 },
      { z: this.z + 0, x: this.x + 1, y: this.y + 1, w: this.w - 1 },
      { z: this.z + 1, x: this.x - 1, y: this.y - 1, w: this.w - 1 },
      { z: this.z + 1, x: this.x - 1, y: this.y + 0, w: this.w - 1 },
      { z: this.z + 1, x: this.x - 1, y: this.y + 1, w: this.w - 1 },
      { z: this.z + 1, x: this.x + 0, y: this.y - 1, w: this.w - 1 },
      { z: this.z + 1, x: this.x + 0, y: this.y + 0, w: this.w - 1 },
      { z: this.z + 1, x: this.x + 0, y: this.y + 1, w: this.w - 1 },
      { z: this.z + 1, x: this.x + 1, y: this.y - 1, w: this.w - 1 },
      { z: this.z + 1, x: this.x + 1, y: this.y + 0, w: this.w - 1 },
      { z: this.z + 1, x: this.x + 1, y: this.y + 1, w: this.w - 1 },
      { z: this.z - 1, x: this.x - 1, y: this.y - 1, w: this.w + 0 },
      { z: this.z - 1, x: this.x - 1, y: this.y + 0, w: this.w + 0 },
      { z: this.z - 1, x: this.x - 1, y: this.y + 1, w: this.w + 0 },
      { z: this.z - 1, x: this.x + 0, y: this.y - 1, w: this.w + 0 },
      { z: this.z - 1, x: this.x + 0, y: this.y + 0, w: this.w + 0 },
      { z: this.z - 1, x: this.x + 0, y: this.y + 1, w: this.w + 0 },
      { z: this.z - 1, x: this.x + 1, y: this.y - 1, w: this.w + 0 },
      { z: this.z - 1, x: this.x + 1, y: this.y + 0, w: this.w + 0 },
      { z: this.z - 1, x: this.x + 1, y: this.y + 1, w: this.w + 0 },
      { z: this.z + 0, x: this.x - 1, y: this.y - 1, w: this.w + 0 },
      { z: this.z + 0, x: this.x - 1, y: this.y + 0, w: this.w + 0 },
      { z: this.z + 0, x: this.x - 1, y: this.y + 1, w: this.w + 0 },
      { z: this.z + 0, x: this.x + 0, y: this.y - 1, w: this.w + 0 },
      { z: this.z + 0, x: this.x + 0, y: this.y + 1, w: this.w + 0 },
      { z: this.z + 0, x: this.x + 1, y: this.y - 1, w: this.w + 0 },
      { z: this.z + 0, x: this.x + 1, y: this.y + 0, w: this.w + 0 },
      { z: this.z + 0, x: this.x + 1, y: this.y + 1, w: this.w + 0 },
      { z: this.z + 1, x: this.x - 1, y: this.y - 1, w: this.w + 0 },
      { z: this.z + 1, x: this.x - 1, y: this.y + 0, w: this.w + 0 },
      { z: this.z + 1, x: this.x - 1, y: this.y + 1, w: this.w + 0 },
      { z: this.z + 1, x: this.x + 0, y: this.y - 1, w: this.w + 0 },
      { z: this.z + 1, x: this.x + 0, y: this.y + 0, w: this.w + 0 },
      { z: this.z + 1, x: this.x + 0, y: this.y + 1, w: this.w + 0 },
      { z: this.z + 1, x: this.x + 1, y: this.y - 1, w: this.w + 0 },
      { z: this.z + 1, x: this.x + 1, y: this.y + 0, w: this.w + 0 },
      { z: this.z + 1, x: this.x + 1, y: this.y + 1, w: this.w + 0 },
      { z: this.z - 1, x: this.x - 1, y: this.y - 1, w: this.w + 1 },
      { z: this.z - 1, x: this.x - 1, y: this.y + 0, w: this.w + 1 },
      { z: this.z - 1, x: this.x - 1, y: this.y + 1, w: this.w + 1 },
      { z: this.z - 1, x: this.x + 0, y: this.y - 1, w: this.w + 1 },
      { z: this.z - 1, x: this.x + 0, y: this.y + 0, w: this.w + 1 },
      { z: this.z - 1, x: this.x + 0, y: this.y + 1, w: this.w + 1 },
      { z: this.z - 1, x: this.x + 1, y: this.y - 1, w: this.w + 1 },
      { z: this.z - 1, x: this.x + 1, y: this.y + 0, w: this.w + 1 },
      { z: this.z - 1, x: this.x + 1, y: this.y + 1, w: this.w + 1 },
      { z: this.z + 0, x: this.x - 1, y: this.y - 1, w: this.w + 1 },
      { z: this.z + 0, x: this.x - 1, y: this.y + 0, w: this.w + 1 },
      { z: this.z + 0, x: this.x - 1, y: this.y + 1, w: this.w + 1 },
      { z: this.z + 0, x: this.x + 0, y: this.y - 1, w: this.w + 1 },
      { z: this.z + 0, x: this.x + 0, y: this.y + 0, w: this.w + 1 },
      { z: this.z + 0, x: this.x + 0, y: this.y + 1, w: this.w + 1 },
      { z: this.z + 0, x: this.x + 1, y: this.y - 1, w: this.w + 1 },
      { z: this.z + 0, x: this.x + 1, y: this.y + 0, w: this.w + 1 },
      { z: this.z + 0, x: this.x + 1, y: this.y + 1, w: this.w + 1 },
      { z: this.z + 1, x: this.x - 1, y: this.y - 1, w: this.w + 1 },
      { z: this.z + 1, x: this.x - 1, y: this.y + 0, w: this.w + 1 },
      { z: this.z + 1, x: this.x - 1, y: this.y + 1, w: this.w + 1 },
      { z: this.z + 1, x: this.x + 0, y: this.y - 1, w: this.w + 1 },
      { z: this.z + 1, x: this.x + 0, y: this.y + 0, w: this.w + 1 },
      { z: this.z + 1, x: this.x + 0, y: this.y + 1, w: this.w + 1 },
      { z: this.z + 1, x: this.x + 1, y: this.y - 1, w: this.w + 1 },
      { z: this.z + 1, x: this.x + 1, y: this.y + 0, w: this.w + 1 },
      { z: this.z + 1, x: this.x + 1, y: this.y + 1, w: this.w + 1 },
    ];
  }

  // checks if this point matches pos
  isSamePointAs(otherPoint) {
    if (!otherPoint instanceof Point) {
      // construction must be made of Points
      throw new Error("isSamePoint only checks point");
    }

    if (this.hash === otherPoint.hash) {
      return true;
    } else {
      return false;
    }
  }
}

class World {
  constructor() {
    [...arguments].forEach((arg) => {
      if (!arg[0] instanceof Point || !typeof arg[1] == "string") {
        // construction must be made of Points
        throw new Error("World must be composed of [Point, STRING]");
      }
    });
    this.points = new Map([...arguments]);
  }

  addMultiple(arr, update = "yes") {
    let statusObj = { added: [], updated: [], ignored: [] };
    // Check all args first
    arr.forEach((arg) => {
      let point = arg[1];
      let pHash = arg[0];
      let addPoint = this.add(pHash, point, update);
      if (addPoint === "updated") {
        statusObj.updated.push(arg);
      } else if (addPoint === "added") {
        statusObj.added.push(arg);
      } else if (addPoint === "ignored") {
        statusObj.ignored.push(arg);
      } else {
        throw new Error("Unable to add point");
      }
    });
    return statusObj;
  }

  /**
   * Add Point to Set
   * @param {Point} Point or Arry of Points to add
   * @return {String} return added or updated
   */
  add(pHash, point, update = "yes") {
    // Check all args first
    if (!point instanceof Point || !typeof pHash == "string") {
      // construction must be made of Points
      throw new Error("World must be composed of [Point, STRING]");
    }
    if (this.points.has(pHash)) {
      if (update !== "yes") {
        return "ignored";
      } else {
        this.points.delete(pHash);
        this.points.set(pHash, point);
        return "updated";
      }
    } else {
      this.points.set(pHash, point);
      return "added";
    }
  }

  /**
   * Delete Point from Set
   * @param {Point} Point or Arry of Points to add
   * @return {Bool} Returns TRUE if removed
   */
  del(hash) {
    // Check all args first
    if (!typeofhash == "string") {
      // construction must be a hash
      throw new Error("Deleting a point from world required a hash string");
    }
    return this.points(hash);
  }
}

/**
 * doThing
 * @param {Array} Array of arrays of active or inactive values
 * @param {Number} Int of number of cycles to run
 * @return {Number} Int of number of active values
 */
const doThing = (arr, cycles = 6) => {
  // 3D Space object
  // Array of Point items
  let _world = new World();

  // Create initial world state in _world object
  // when working through input array assume that we start at 0,0,0 z,x,y
  let initialPoints = [];
  arr.forEach((row, x) => {
    // Work through every row and then every column
    row.forEach((pos, y) => {
      let _point = new Point(0, x, y, 0);
      if (pos === "#") {
        _point.isActive = true;
      }
      initialPoints.push([_point.hash, _point]);
    });
  });

  // add points in initialPoints to _world
  _world.addMultiple([...initialPoints]);

  // Run itterations of worlds
  for (let c = 0; c < cycles; c++) {
    console.log(c);

    // Loop through every point in world and make sure all neighbors exists
    // but set them as false and add them to _nPoints
    let _nPoints = [];
    for (let [hash, point] of _world.points.entries()) {
      // key is hash, value is Point
      point.neighborPoints.forEach((neighbor, n) => {
        let _nPoint = new Point(neighbor.z, neighbor.x, neighbor.y, neighbor.w);
        _nPoints.push([_nPoint.hash, _nPoint]);
      });
    }

    // now that we are out of a for loop add _nPoints to _world
    _world.addMultiple(_nPoints, "noUpdate");

    let nPointsToUpdate = [];
    // once we've added all neighbors that we have to check, we now need to
    // check all if we need to change
    for (let [hash, point] of _world.points.entries()) {
      let activeNeighbors = 0;
      let inactiveNeighbors = 0;
      // check all neighbors if they exists and are true
      point.neighborPoints.forEach((neighbor, n) => {
        if (
          _world.points.has(
            `z${neighbor.z}x${neighbor.x}y${neighbor.y}w${neighbor.w}`
          )
        ) {
          let _p = _world.points.get(
            `z${neighbor.z}x${neighbor.x}y${neighbor.y}w${neighbor.w}`
          );
          if (_p.isActive === true) {
            activeNeighbors++;
          } else {
            inactiveNeighbors++;
          }
        } else {
          inactiveNeighbors++;
        }
      });

      // we always make a new point :(
      let _newP = new Point(point.z, point.x, point.y, point.w);
      if (point.isActive) {
        if (activeNeighbors === 2 || activeNeighbors === 3) {
          // leave active
          _newP.isActive = true;
        } else {
          _newP.isActive = false;
        }
      } else {
        if (activeNeighbors === 3) {
          _newP.isActive = true;
        } else {
          _newP.isActive = false;
        }
      }

      nPointsToUpdate.push([_newP.hash, _newP]);
    }

    _world.addMultiple(nPointsToUpdate);
  }

  // console.log(_world);
  let activePoints = 0;
  for (let [hash, point] of _world.points.entries()) {
    if (point.isActive) {
      activePoints++;
    }
  }

  return activePoints;
};

console.log(`Part 1: doThing = ${doThing(data)}`);

// console.log(`Part 2: doThing but harder = ${doThing(data)}`);

let testP1 = new Point(0, 0, 0, 0);
