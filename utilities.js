//Parameter type validation function
function validateParameter(param, paramType) {
  if (typeof param !== paramType) {
    console.log(
      `Expected a ${paramType} for ${paramType}, but got ${typeof param}`
    );
    return false;
  }

  return true;
}

// Id Generator for unique identification of numbers
function idGenerator(lengthOfId = 8) {
  const characterPool =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*";

  let idGenerated = "";

  for (let i = 0; i < lengthOfId; i++) {
    const randIndex = Math.floor(Math.random() * (characterPool.length - 1));
    idGenerated += characterPool[randIndex];
  }

  return idGenerated;
}

const projectUtilities = { validateParameter, idGenerator };

export default projectUtilities;
