export function getAverageColor(
    data: Uint8ClampedArray,
    width: number,
    startX: number,
    startY: number,
    regionWidth: number,
    regionHeight: number,
  ) {
    let r = 0,
      g = 0,
      b = 0
    let count = 0
  
    for (let y = startY; y < startY + regionHeight; y++) {
      for (let x = startX; x < startX + regionWidth; x++) {
        const index = (y * width + x) * 4
        r += data[index]
        g += data[index + 1]
        b += data[index + 2]
        count++
      }
    }
  
    return {
      r: r / count,
      g: g / count,
      b: b / count,
    }
  }
  
  export function calculateColorDistance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) {
    return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2))
  }
  
  