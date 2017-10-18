export function rand() {
  return Math.random() * 0.4 - 0.2 // Random weight between -0.2 and 0.2
}

// Mean squared error
export function mse(errors) {
  const sum = errors.reduce((sum, i) => sum + i * i, 0);
  return sum / errors.length
}

export function sum(array) {
  return array.reduce((sum, i) => sum + i, 0)
}

export function sigmoid(x) {
  return 1 / (1 + Math.E ** -x)
}
