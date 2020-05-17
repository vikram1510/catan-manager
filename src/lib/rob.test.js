import { rob } from './rob'


test('rob is random', () => {
  const innocent = {
    innocent: {
      brick: 1,
      rock: 1,
      grain: 1,
      wood: 1,
      sheep: 1
    }
  }

  const counts = {
    brick: 0,
    rock: 0,
    grain: 0,
    wood: 0,
    sheep: 0
  }

  const iterations = 100_000
  const expected = (iterations / 5) * 0.95

  for (let i = 0; i < iterations; i++) {
    let output = rob(innocent)
    counts[output] = counts[output] + 1
  }
  console.log(counts)

  expect(counts.brick).toBeGreaterThan(expected)
  expect(counts.rock).toBeGreaterThan(expected)
  expect(counts.grain).toBeGreaterThan(expected)
  expect(counts.wood).toBeGreaterThan(expected)
  expect(counts.sheep).toBeGreaterThan(expected)


})
