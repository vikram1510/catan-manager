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

  for (let i = 0; i < 1000; i++) {
    let output = rob(innocent)
    counts[output] = counts[output] + 1
  }
  console.log(counts)

  expect(counts.brick).toBeGreaterThan(180)
  expect(counts.rock).toBeGreaterThan(180)
  expect(counts.grain).toBeGreaterThan(180)
  expect(counts.wood).toBeGreaterThan(180)
  expect(counts.sheep).toBeGreaterThan(180)


})
