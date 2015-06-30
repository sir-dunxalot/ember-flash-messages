/* Requires var to pass jshint */

/* First test message */

var expectedContent = 'This is the first message';
var expectedDuration = 3000; // Default
var expectedType = 'success';
var expectedMessage = {
  content: expectedContent,
  duration: expectedDuration,
  type: expectedType,
};

/* Second test message */

var expectedContentTwo = 'This is the second message';
var expectedDurationTwo = 2000;
var expectedTypeTwo = 'error';
var expectedMessageTwo = {
  content: expectedContentTwo,
  duration: expectedDurationTwo,
  type: expectedTypeTwo,
};

/* Untimed message */

var untimedMessageDuration = 0;
var untimedMessageContent = 'This is the untimed message';
var untimedMessageType = 'success';
var untimedMessage = {
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
