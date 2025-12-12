import Button from './components/Button.tsx';
import ButtonContainer from './components/ButtonsContainer.tsx';
import ResultLabel from './components/ResultLabel.tsx';
import LastOperationLabel from './components/LastOperationLabel.tsx';
import { useState } from 'react';
import { type Operator } from './types/Operator.ts';

/////////////////////
// Button List
/////////////////////

function App() {
  /////////////////////
  // Buttons Array
  /////////////////////

  const calculatorButtons = [
    {
      name: 'remove',
      text: 'DEL',
      color: 'bg-zinc-400',
      onClick: removeNumber,
    },
    { name: 'clear', text: 'C', color: 'bg-zinc-400', onClick: clearNumbers },
    {
      name: 'plusminus',
      text: '+/-',
      color: 'bg-zinc-400',
      onClick: selectPlusMinus,
    },
    {
      name: 'divide',
      text: '/',
      color: 'bg-orange-400',
      onClick: () => selectOperator('/'),
    },

    {
      name: 'seven',
      text: '7',
      color: 'bg-zinc-600',
      onClick: () => selectNumber('7'),
    },
    {
      name: 'eight',
      text: '8',
      color: 'bg-zinc-600',
      onClick: () => selectNumber('8'),
    },
    {
      name: 'nine',
      text: '9',
      color: 'bg-zinc-600',
      onClick: () => selectNumber('9'),
    },
    {
      name: 'multiply',
      text: 'X',
      color: 'bg-orange-400',
      onClick: () => selectOperator('x'),
    },

    {
      name: 'four',
      text: '4',
      color: 'bg-zinc-600',
      onClick: () => selectNumber('4'),
    },
    {
      name: 'five',
      text: '5',
      color: 'bg-zinc-600',
      onClick: () => selectNumber('5'),
    },
    {
      name: 'six',
      text: '6',
      color: 'bg-zinc-600',
      onClick: () => selectNumber('6'),
    },
    {
      name: 'minus',
      text: '-',
      color: 'bg-orange-400',
      onClick: () => selectOperator('-'),
    },

    {
      name: 'one',
      text: '1',
      color: 'bg-zinc-600',
      onClick: () => selectNumber('1'),
    },
    {
      name: 'two',
      text: '2',
      color: 'bg-zinc-600',
      onClick: () => selectNumber('2'),
    },
    {
      name: 'three',
      text: '3',
      color: 'bg-zinc-600',
      onClick: () => selectNumber('3'),
    },
    {
      name: 'plus',
      text: '+',
      color: 'bg-orange-400',
      onClick: () => selectOperator('+'),
    },

    {
      name: 'star',
      text: '★',
      color: 'bg-blue-400',
      onClick: () => console.log('Star pressed'),
    },
    {
      name: 'zero',
      text: '0',
      color: 'bg-zinc-600',
      onClick: () => selectNumber('0'),
    },
    { name: 'comma', text: ',', color: 'bg-zinc-600', onClick: selectComma },
    { name: 'equal', text: '=', color: 'bg-orange-400', onClick: selectEqual },
  ];

  /////////////////////
  // State
  /////////////////////

  const [prevNumber, setPrevNumber] = useState('');
  const [curNumber, setCurNumber] = useState('0');
  const [selectedOp, setSelectedOp] = useState<'' | Operator>('');

  /////////////////////
  // Functions
  /////////////////////

  function selectNumber(number: string) {
    // If curNumber is 0, and user selects 0, return
    if (curNumber === '0' && number === '0') return;

    setCurNumber((prev) => {
      // If curNumber is 0, and user selects a number other than 0, set curNumber to an empty string
      if (prev === '0') {
        return number;
      }

      // Add the number to curNumber
      return prev + number;
    });
  }

  function removeNumber() {
    // If curNumber has more than 1 digit, remove the last digit
    if (curNumber.length > 1) setCurNumber(curNumber.slice(0, -1));
    // If curNumber has only one digit, set curNumber to 0
    else setCurNumber('0');
  }

  function selectPlusMinus() {
    if (curNumber === '0') return;

    // Convert curNumber to a number, multiply it by -1 and convert it back
    setCurNumber(String(+curNumber.replace(',', '.') * -1));
  }

  function selectComma() {
    if (curNumber.includes(',')) return;

    setCurNumber(curNumber + ',');
  }

  function selectOperator(operator: Operator) {
    // If user already selected an operator, calculate
    if (selectedOp) setPrevNumber(calculate().toLocaleString('de-DE'));
    // If not, set prevNumber to curNumber
    else setPrevNumber(curNumber);

    // Update selectedOp
    setSelectedOp(operator);

    // Set curNumber to 0
    setCurNumber('0');
  }

  function selectEqual() {
    if (!selectedOp) return;

    // prevNum shows the whole calculation
    setPrevNumber(`${prevNumber} ${selectedOp} ${curNumber} =`);

    // Reset the selected Operator
    setSelectedOp('');

    // Show result
    setCurNumber(String(calculate()));
  }

  function clearNumbers() {
    // Reset everything
    setPrevNumber('');
    setCurNumber('0');
    setSelectedOp('');
  }

  const calculate = function (): number {
    // Convert prev- and curNumber to number
    const num1: number = parseFloat(prevNumber.replace(',', '.'));
    const num2: number = parseFloat(curNumber.replace(',', '.'));

    // Do the calculation, based on selectedOp
    switch (selectedOp) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case 'x':
        return num1 * num2;
      case '/':
        return num1 / num2;
      default:
        return num2;
    }
  };

  return (
    <main>
      <div className="calc-container">
        <LastOperationLabel>
          {prevNumber} {selectedOp}
        </LastOperationLabel>
        <ResultLabel>{curNumber}</ResultLabel>
        <ButtonContainer>
          {calculatorButtons.map((b) => (
            <Button key={b.name} props={b} />
          ))}
        </ButtonContainer>
      </div>
    </main>
  );
}

export default App;
