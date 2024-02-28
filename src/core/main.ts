import { Vector3 } from 'three'
import { Matrix } from './matrix'

export const calculateTang = (point1: Vector3, point2: Vector3) => {
  const adjacentCatheter = point1.x - point2.x
  const oppositeCatheter = point1.y - point2.y
  return oppositeCatheter / adjacentCatheter
}

export const calculateGipotenuze = (point1: Vector3, point2: Vector3) => {
  const adjacentCatheter = Math.abs(point1.x - point2.x)
  const oppositeCatheter = Math.abs(point1.y - point2.y)
  return Math.sqrt(Math.pow(adjacentCatheter, 2) + Math.pow(oppositeCatheter, 2))
}

export const calculateFreeMember = (tangens: number, point: Vector3) => point.y - tangens * point.x

export const calculateHalfCord = (point1: Vector3, point2: Vector3) =>
  new Vector3((point1.x + point2.x) / 2, point1.y + point2.y / 2)

export const lineEquation = (point1: Vector3, point2: Vector3, x: number) => {
  const x1 = point1.x
  const y1 = point1.y
  const x2 = point2.x
  const y2 = point2.y
  return ((y2 - y1) * (x - x1)) / (x2 - x1) + y1
}

export const vectorToMatrix = (points: Vector3[]) => {
  const matrix = new Matrix(points.length, 3)
  points.forEach((point, index) => {
    matrix.set(index, 0, point.x)
    matrix.set(index, 1, point.y)
    matrix.set(index, 2, 1)
  })
  return matrix
}

export const matrixToVector = (matrix: Matrix) =>
  matrix.getData().map(row => new Vector3(row[0], row[1], 0.01))

export const calculateReflect: (
  startPoint: Vector3,
  endPoint: Vector3,
  figure: Vector3[]
) => Vector3[] = (startPoint, endPoint, figure) => {
  let figureMatrix = vectorToMatrix(figure)
  const tangens = Math.atan(calculateTang(startPoint, endPoint))

  let lineMatrix = new Matrix(2, 3)
  lineMatrix.set(0, 0, startPoint.x)
  lineMatrix.set(0, 1, startPoint.y)
  lineMatrix.set(0, 2, 1)
  lineMatrix.set(1, 0, endPoint.x)
  lineMatrix.set(1, 1, endPoint.y)
  lineMatrix.set(1, 2, 1)

  const ys = lineEquation(startPoint, endPoint, 0)

  const moveToMatrix = new Matrix(3, 3)
  moveToMatrix.set(0, 0, 1)
  moveToMatrix.set(0, 1, 0)
  moveToMatrix.set(0, 2, 0)
  moveToMatrix.set(1, 0, 0)
  moveToMatrix.set(1, 1, 1)
  moveToMatrix.set(1, 2, 0)
  moveToMatrix.set(2, 0, 0)
  moveToMatrix.set(2, 1, -ys)
  moveToMatrix.set(2, 2, 1)

  const moveBackMatrix = new Matrix(3, 3)
  moveBackMatrix.set(0, 0, 1)
  moveBackMatrix.set(0, 1, 0)
  moveBackMatrix.set(0, 2, 0)
  moveBackMatrix.set(1, 0, 0)
  moveBackMatrix.set(1, 1, 1)
  moveBackMatrix.set(1, 2, 0)
  moveBackMatrix.set(2, 0, 0)
  moveBackMatrix.set(2, 1, ys)
  moveBackMatrix.set(2, 2, 1)

  const rotateMatrix = new Matrix(3, 3)
  rotateMatrix.set(0, 0, Math.cos(tangens))
  rotateMatrix.set(0, 1, -Math.sin(tangens))
  rotateMatrix.set(0, 2, 0)
  rotateMatrix.set(1, 0, Math.sin(tangens))
  rotateMatrix.set(1, 1, Math.cos(tangens))
  rotateMatrix.set(1, 2, 0)
  rotateMatrix.set(2, 0, 0)
  rotateMatrix.set(2, 1, 0)
  rotateMatrix.set(2, 2, 1)

  const rotateBackMatrix = new Matrix(3, 3)
  rotateBackMatrix.set(0, 0, Math.cos(tangens))
  rotateBackMatrix.set(0, 1, Math.sin(tangens))
  rotateBackMatrix.set(0, 2, 0)
  rotateBackMatrix.set(1, 0, -Math.sin(tangens))
  rotateBackMatrix.set(1, 1, Math.cos(tangens))
  rotateBackMatrix.set(1, 2, 0)
  rotateBackMatrix.set(2, 0, 0)
  rotateBackMatrix.set(2, 1, 0)
  rotateBackMatrix.set(2, 2, 1)

  const reflectMatrix = new Matrix(3, 3)
  reflectMatrix.set(0, 0, 1)
  reflectMatrix.set(0, 1, 0)
  reflectMatrix.set(0, 2, 0)
  reflectMatrix.set(1, 0, 0)
  reflectMatrix.set(1, 1, -1)
  reflectMatrix.set(1, 2, 0)
  reflectMatrix.set(2, 0, 0)
  reflectMatrix.set(2, 1, 0)
  reflectMatrix.set(2, 2, 1)

  figureMatrix = figureMatrix.multiply(moveToMatrix)

  figureMatrix = figureMatrix.multiply(rotateMatrix)

  figureMatrix = figureMatrix.multiply(reflectMatrix)

  figureMatrix = figureMatrix.multiply(rotateBackMatrix)

  figureMatrix = figureMatrix.multiply(moveBackMatrix)

  return matrixToVector(figureMatrix)
}
