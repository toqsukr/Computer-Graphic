export class Matrix {
  private readonly rows: number
  private readonly cols: number
  private readonly data: number[][]

  constructor(rows: number, cols: number) {
    this.rows = rows
    this.cols = cols
    this.data = []
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = []
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = 0
      }
    }
  }

  getData(): number[][] {
    return this.data
  }

  set(row: number, col: number, value: number) {
    this.data[row][col] = value
    return this
  }

  get(row: number, col: number): number {
    return this.data[row][col]
  }

  multiply(other: Matrix): Matrix {
    if (this.cols !== other.rows) {
      throw new Error(
        'Number of columns in the first matrix must match number of rows in the second matrix.'
      )
    }
    const result = new Matrix(this.rows, other.cols)
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < other.cols; j++) {
        let sum = 0
        for (let k = 0; k < this.cols; k++) {
          sum += this.data[i][k] * other.data[k][j]
        }
        result.set(i, j, sum)
      }
    }
    return result
  }

  equals(other: Matrix): boolean {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      return false
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.data[i][j] !== other.data[i][j]) {
          return false
        }
      }
    }
    return true
  }

  inverse(): Matrix {
    if (this.rows !== this.cols) {
      throw new Error('Matrix must be square to find its inverse.')
    }

    // Создаем единичную матрицу того же размера, что и исходная матрица
    const identity = new Matrix(this.rows, this.cols)
    for (let i = 0; i < this.rows; i++) {
      identity.set(i, i, 1)
    }

    // Создаем копию исходной матрицы, чтобы не изменять оригинал
    const copy = new Matrix(this.rows, this.cols)
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        copy.set(i, j, this.data[i][j])
      }
    }

    // Применяем метод Гаусса-Жордана для нахождения обратной матрицы
    for (let i = 0; i < this.rows; i++) {
      // Делаем элемент на диагонали равным 1, деля строку на соответствующий элемент
      const diagonalElement = copy.data[i][i]
      for (let j = 0; j < this.cols; j++) {
        copy.data[i][j] /= diagonalElement
        identity.data[i][j] /= diagonalElement
      }

      // Обнуляем остальные элементы в столбце путем вычитания строки с текущим элементом из остальных строк
      for (let k = 0; k < this.rows; k++) {
        if (k !== i) {
          const factor = copy.data[k][i]
          for (let j = 0; j < this.cols; j++) {
            copy.data[k][j] -= copy.data[i][j] * factor
            identity.data[k][j] -= identity.data[i][j] * factor
          }
        }
      }
    }

    return identity
  }

  print(): void {
    console.log(this.data)
  }
}
