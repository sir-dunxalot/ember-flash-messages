/* First test message */

const expectedContent = 'This is the first message';
const expectedDuration = 3000; // Default
const expectedType = 'success';
const expectedMessage = {
  content: expectedContent,
  duration: expectedDuration,
  type: expectedType,
};

/* Second test message */

const expectedContentTwo = 'This is the second message';
const expectedDurationTwo = 2000;
const expectedTypeTwo = 'error';
const expectedMessageTwo = {
  content: expectedContentTwo,
  duration: expectedDurationTwo,
  type: expectedTypeTwo,
};

/* Untimed message */

const untimedMessageDuration = 0;
const untimedMessageContent = 'This is the untimed message';
const untimedMessageType = 'success';
const untimedMessage = {
  duration: 0,
  content: expectedContent,
  type: expectedType,
};

export {
  expectedContent,
  expectedDuration,
  expectedType,
  expectedMessage,

  expectedContentTwo,
  expectedDurationTwo,
  expectedTypeTwo,
  expectedMessageTwo,

  untimedMessageDuration,
  untimedMessageContent,
  untimedMessageType,
  untimedMessage
};
