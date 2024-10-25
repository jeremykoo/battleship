export const Ship = ((shipID, shipLength) => {
  const id = shipID;
  const length = shipLength;
  let hits = 0;
  let sunk = false;
  
  const hit = () => {
    hits += 1;
    if (hits >= length) {
      sunk = true;
    }
  };

  const printHits = () => {
    console.log(id, 'hits =', hits);
  }

  const isSunk = () => sunk ;

  return {
    hit,
    isSunk,
    printHits
  }
});