'use strict';

class Matrix {
  constructor(rows, cols) {
    if (rows instanceof Array) {
      if (rows[0] instanceof Array) {
        this.grid = rows;
      } else {
        this.grid = [rows];
      }
    } else {
      this.grid = [];
      for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
          row.push(0);
        }
        this.grid.push(row);
      }
    }
  }

  /*----------------
    initialization  
  ----------------*/
  fillInc() {
    let rows = this.rows();
    let cols = this.cols();
    this.grid = [];
    let count = 0;
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push(count);
        count++;
      }
      this.grid.push(row);
    }
    count = null;
    rows = null;
    cols = null;
  }

  fillZeros() {
    let rows = this.rows();
    let cols = this.cols();
    let newGrid = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push(0);
      }
      newGrid.push(row);
    }
    this.grid = newGrid;
  }

  fillRand(mean = 0, stdev = 1) {
    let rows = this.rows();
    let cols = this.cols();
    let newGrid = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push(Matrix.randn(mean, stdev));
      }
      newGrid.push(row);
    }
    this.grid = newGrid;
  }

  /*---------
    getters      
  ---------*/

  //returns the number of rows in this matrix
  rows() {
    return this.grid.length;
  }

  //returns the number of cols in this matrix
  cols() {
    return this.grid[0].length;
  }

  //returns the shape of this matrix [rows, cols]
  shape() {
    return [this.grid.length, this.grid[0].length];
  }

  //returns the nth row
  getRow(n) {
    return this.grid[n];
  }

  //returns the nth column
  getCol(n) {
    return this.grid.map(function (x) {
      return x[n];
    });
  }

  dataCount() {
    return this.rows() * this.cols();
  }

  console() {
    console.log(JSON.parse(JSON.stringify(this)));
  }
  sum(axis, keepdims) {
    if (axis == null) {
      let sum = 0;
      for (let i = 0; i < this.rows(); i++) {
        for (let j = 0; j < this.cols(); j++) {
          sum += this.grid[i][j];
        }
      }
      return sum;
    }

    let sumArr = [];
    if (axis == 0) {
      for (let i = 0; i < this.cols(); i++) {
        let colSum = 0;
        let col = this.getCol(i);
        for (let j = 0; j < this.rows(); j++) {
          colSum += col[j];
        }
        sumArr.push(colSum);
      }
    }

    if (axis == 1) {
      for (let i = 0; i < this.rows(); i++) {
        let rowSum = 0;
        let row = this.getRow(i);
        for (let j = 0; j < this.cols(); j++) {
          rowSum += row[j];
        }
        sumArr.push(rowSum);
      }
      if (keepdims == true) sumArr = sumArr.map((x) => [x]);
    }
    return new Matrix(sumArr);
  }

  clip(min, max) {
    this.modFunc((x) => x < min ? x = min : x > max ? x = max : x);
  }

  copy() {
    let newGrid = [];
    for (let i = 0; i < this.rows(); i++){
      let row = []
      for (let j = 0; j < this.cols(); j++){
        row.push(this.grid[i][j]);
      }
      newGrid.push(row);
    }
    return new Matrix(newGrid);
  }

  mean() {
    let sum = this.sum();
    let mean;
    if (typeof sum == 'number') {
      mean = sum / this.dataCount();
    }
    return mean;
  }

  selectNth(m1){
    let newGrid = []
    for(let i = 0; i < this.rows(); i++){
      newGrid.push(this.grid[i][m1.grid[0][i]]);
    }
    return new Matrix(newGrid);
  }

  iOfMax(axis, keepdims) {
    if (axis == null) {
      let max = this.grid[0][0];
      let maxI = [0, 0];
      for (let i = 0; i < this.rows(); i++) {
        for (let j = 0; j < this.cols(); j++) {
          let value = this.grid[i][j];
          if (value > max) {
            max = value;
            maxI = [i, j];
          }
        }
      }
      return max;
    }

    let maxArr = [];
    if (axis == 1) {
      for (let i = 0; i < this.rows(); i++) {
        let row = this.getRow(i);
        let rowI = 0;
        let rowMax = row[0];
        for (let j = 0; j < this.cols(); j++) {
          if (row[j] > rowMax) {
            rowMax = row[j];
            rowI = j;
          }
        }
        maxArr.push(rowI);
      }
      if (keepdims == true) maxArr = maxArr.map((x) => [x]);
    }

    if (axis == 0) {
      for (let i = 0; i < this.cols(); i++) {
        let col = this.getCol(i);
        let colMax = col[0];
        let colI = 0;
        for (let j = 0; j < this.rows(); j++) {
          if (col[j] > colMax) {
            colMax = col[j];
            colI = j;
          }
        }
        maxArr.push(colI);
      }
    }
    return new Matrix(maxArr);
  }

  max(axis, keepdims) {
    if (axis == null) {
      let max = this.grid[0][0];
      for (let i = 0; i < this.rows(); i++) {
        for (let j = 0; j < this.cols(); j++) {
          let value = this.grid[i][j];
          if (value > max) max = value;
        }
      }
      return max;
    }
    let maxArr = [];
    if (axis == 1) {
      for (let i = 0; i < this.rows(); i++) {
        let row = this.getRow(i);
        let rowMax = row[0];
        for (let j = 0; j < this.cols(); j++) {
          if (row[j] > rowMax) rowMax = row[j];
        }
        maxArr.push(rowMax);
      }
      if (keepdims == true) maxArr = maxArr.map((x) => [x]);
    }

    if (axis == 0) {
      for (let i = 0; i < this.cols(); i++) {
        let col = this.getCol(i);
        let colMax = col[0];
        for (let j = 0; j < this.rows(); j++) {
          if (col[j] > colMax) colMax = col[j];
        }
        maxArr.push(colMax);
      }
    }
    return new Matrix(maxArr);
  }
  /*------------
    operations  
  ------------*/

  opFunc(f, m) {
    if (typeof m == "number") {
      this.grid = this.grid.map((row) => row.map((x) => f(x, m)));
      return;
    }

    let thisDim = this.shape();
    let mDim = m.shape();
    if (thisDim[0] == mDim[0] && mDim[1] == mDim[1]) {
      for (let i = 0; i < thisDim[0]; i++) {
        for (let j = 0; j < thisDim[1]; j++) {
          this.grid[i][j] = f(this.grid[i][j], m.grid[i][0]);
          return;
        }
      }
    }

    if (thisDim[0] == mDim[0] && mDim[1] == 1) {
      for (let i = 0; i < thisDim[0]; i++) {
        for (let j = 0; j < thisDim[1]; j++) {
          this.grid[i][j] = f(this.grid[i][j], m.grid[0][j]);
          return;
        }
      }
    }

    if (thisDim[1] == mDim[1] && mDim[0] == 1) {
      for (let i = 0; i < thisDim[0]; i++) {
        for (let j = 0; j < thisDim[1]; j++) {
          this.grid[i][j] = f(this.grid[i][j], m.grid[i][j]);
          return;
        }
      }
    }
    throw Matrix.dimError;
  }

  // adds func to matrix {f: function, parameters=[a, b, c...]}
  modFunc(f) {
    this.grid = this.grid.map((row) => row.map(f));
  }
  // returns a new matrix equal to m1 * s where s is a scaler
  mult(m) {
    this.opFunc((x1, x2) => x1 * x2, m);
  }

  div(m) {
    this.opFunc((x1, x2) => x1 / x2, m);
  }

  //returns a new matrix equal to m1 - m2
  sub(m2) {
    this.grid = Matrix.opFunc((x1, x2) => x1 - x2, this, m2).grid;
  }

  //returns a new matrix equal to m1 + m2
  add(m2) {
    this.grid = Matrix.opFunc((x1, x2) => x1 + x2, this, m2).grid;
  }
  // transposes this matrix shape [2,3]  becomes shape [3,2]
  //                        [[1, 4],
  //   [[1, 2, 3],           [2, 5],
  //    [4, 5, 6]]  becomes  [3, 6]]
  T() {
    let dims = this.shape();
    let newGrid = [];
    for (let i = 0; i < dims[1]; i++) {
      let row = [];
      for (let j = 0; j < dims[0]; j++) {
        row.push(this.grid[j][i]);
      }
      newGrid.push(row);
    }
    this.grid = newGrid;
  }

  /*----------------
    static methods    
  ----------------*/
  static clip(m1, min, max) {
    return Matrix.modFunc((x) => x < min ? x = min : x > max ? x = max : x, m1);
  }

  static modFunc(f, m1) {
    return new Matrix(m1.grid.map((row) => row.map(f)));
  }

  static opFunc(f, m1, m2) {
    if (typeof m2 == "number") {
      return new Matrix(m1.grid.map((row) => row.map((x) => f(x, m2))));
    }
    let dim1 = m1.shape();
    let dim2 = m2.shape();
    if (dim1[0] == dim2[0] && dim1[1] == dim2[1]) {
      let arr = [];
      for (let i = 0; i < m1.rows(); i++) {
        let row = [];
        for (let j = 0; j < m1.cols(); j++) {
          row.push(f(m1.grid[i][j], m2.grid[i][j]));
        }
        arr.push(row);
      }
      return new Matrix(arr);
    }

    if (dim1[0] == dim2[0] && dim2[1] == 1) {
      let arr = [];
      for (let i = 0; i < dim1[0]; i++) {
        let row = [];
        for (let j = 0; j < dim1[1]; j++) {
          row.push(f(m1.grid[i][j], m2.grid[i][0]));
        }
        arr.push(row);
      }
      return new Matrix(arr);
    }

    if (dim1[1] == dim2[1] && dim2[0] == 1) {
      let arr = [];
      for (let i = 0; i < dim1[0]; i++) {
        let row = [];
        for (let j = 0; j < dim1[1]; j++) {
          row.push(f(m1.grid[i][j], m2.grid[0][j]));
        }
        arr.push(row);
      }
      return new Matrix(arr);
    }
    throw Matrix.dimError;
  }

  // returns a new matrix equal to m1 * s where s is a scaler
  static mult(m1, m2) {
    return Matrix.opFunc((x1, x2) => x1 * x2, m1, m2);
  }

  static div(m1, m2) {
    return Matrix.opFunc((x1, x2) => x1 / x2, m1, m2);
  }

  //returns a new matrix equal to m1 - m2
  static sub(m1, m2) {
    return Matrix.opFunc((x1, x2) => x1 - x2, m1, m2);
  }

  //returns a new matrix equal to m1 + m2
  static add(m1, m2) {
    return Matrix.opFunc((x1, x2) => x1 + x2, m1, m2);
  }

  //returns a new matrix equal to m1 dot m2
  static dot(m1, m2) {
    let dim1 = m1.shape();
    let dim2 = m2.shape();
    if (dim1[1] != dim2[0]) {
      throw Matrix.dimError;
    }
    let newGrid = [];
    for (let i = 0; i < dim1[0]; i++) {
      let row = [];
      for (let j = 0; j < dim2[1]; j++) {
        let sum = 0;
        for (let k = 0; k < dim1[1]; k++) {
          sum += m1.grid[i][k] * m2.grid[k][j];
        }
        row.push(sum);
      }
      newGrid.push(row);
    }
    return new Matrix(newGrid);
  }

  //returns a transposed copy of m
  static T(m) {
    let dims = m.shape();
    let newGrid = [];
    for (let i = 0; i < dims[1]; i++) {
      let row = [];
      for (let j = 0; j < dims[0]; j++) {
        row.push(m.grid[j][i]);
      }
      newGrid.push(row);
    }
    return new Matrix(newGrid);
  }

  static randn(mean = 0, stdev = 1) {
    let rand = 0;
    let offset = 0.5;
    for (let i = 0; i < 6; i += 1) {
      rand += Math.random();
    }

    return (rand / 6 - offset) * stdev + mean;
  }

  /*-------------------
    static attributes     
  -------------------*/
  static dimError = Error("Dimensions are incompatible");
}

// adds m1 to this matrix
// add(m1) {
//   let dimThis = this.shape();
//   if (m1 instanceof Matrix) {
//     let dim1 = m1.shape();
//     if (dim1[0] != dimThis[0] || dim1[1] != dimThis[1]) {
//       throw Matrix.dimError;
//     }
//     for (let i = 0; i < dim1[0]; i++) {
//       for (let j = 0; j < dim1[1]; j++) {
//         this.grid[i][j] += m1.grid[i][j];
//       }
//     }
//   }
// }

// operationFunction(f, m2) {
//   if (typeof m2 == "number") {
//     this.grid = this.grid.map((row) => row.map((x) => x / m2));
//     return;
//   }
//   let dim1 = this.shape();
//   let dim2 = m2.shape();
//   if (dim1[0] == dim2[0] && dim1[1] == dim2[1]) {
//     let arr = [];
//     for (let i = 0; i < dim1[0]; i++) {
//       let row = [];
//       for (let j = 0; j < dim1[1]; j++) {
//         row.push(f(this.grid[i][j], m2.grid[i][j]));
//         arr.push(row);
//       }
//       this.grid = arr;
//       return;
//     }

//     if (dim1[0] == dim2[0] && dim2[1] == 1) {
//       let arr = [];
//       for (let i = 0; i < dim1[0]; i++) {
//         let row = [];
//         for (let j = 0; j < dim1[1]; j++) {
//           row.push(f(this.grid[i][j], m2.grid[i][j]));
//         }
//         arr.push(row);
//       }
//       this.grid = arr;
//       return;
//     }

//     if (dim1[1] == dim2[1] && dim2[0] == 1) {
//       let arr = [];
//       for (let i = 0; i < dim1[0]; i++) {
//         let row = [];
//         for (let j = 0; j < dim1[1]; j++) {
//           row.push(f(this.grid[i][j], m2.grid[i][j]));
//         }
//         arr.push(row);
//       }
//       this.grid = arr;
//       return;
//     }
//     throw Matrix.dimError;
//   }
// }
// subtracts m1 from this matrix
// subtract(m1) {
//   let dim1 = m1.shape();
//   let dimThis = this.shape();
//   if (dim1[0] != dimThis[0] || dim1[1] != dimThis[1]) {
//     throw Matrix.dimError;
//   }
//   for (let i = 0; i < dim1[0]; i++) {
//     for (let j = 0; j < dim1[1]; j++) {
//       this.grid[i][j] -= m1.grid[i][j];
//     }
//   }
// }

// //multiplies this matrix by s where s is a scaler
// mult(s) {
//   this.grid = this.grid.map((row) => row.map((x) => x * s));
// }

// //divides this matrix by s where s is a scaler
// div(d) {
//   this.grid = this.grid.map((row) => row.map((x) => x / d));
