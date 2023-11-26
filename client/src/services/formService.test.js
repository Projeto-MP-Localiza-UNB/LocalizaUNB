import FormService from './formService';

it('Validates email', () => {
  const emails = [
    'asd@asd.com',
    'asds',
    '@',
    '@.com',
    '.com',
    'asd.com',
    'asd asd.com',
    'a@com',
  ];
  expect(FormService.validateEmail(emails[0])).toBeTruthy();
  emails
    .slice(1)
    .forEach((email) => expect(FormService.validateEmail(email)).toBeFalsy());
});

it('Validates password', () => {
  expect(FormService.validatePassword('asd')).toBeTruthy();
  expect(FormService.validatePassword('')).toBeFalsy();
});

it('Validates password confirmation', () => {
  expect(FormService.validatePassword('asd', true, 'asd')).toBeTruthy();
  expect(FormService.validatePassword('as', true, 'asd')).toBeFalsy();
  expect(FormService.validatePassword('', true, 'asd')).toBeFalsy();
  expect(FormService.validatePassword('asd', true, '')).toBeFalsy();
  expect(FormService.validatePassword('', true, '')).toBeFalsy();
});

it('Validates name', () => {
  expect(FormService.validateName('')).toBeFalsy();
  expect(FormService.validateName('Harry')).toBeTruthy();
  expect(
    FormService.validateName(
      'Pedro de Alcântara Francisco Antônio João Carlos Xavier de Paula Miguel Rafael Joaquim José Gonzaga Pascoal Cipriano Serafim de Bragança e Bourbon'
    )
  ).toBeFalsy();
});
