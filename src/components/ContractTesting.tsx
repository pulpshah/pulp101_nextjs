import SignatureCanvas from 'react-signature-canvas';
import { useRef, useState } from 'react';

const ContractTesting = () => {
  const canvasRef = useRef(null);
  const [printName, setPrintName] = useState('');
  const [date, setDate] = useState('');

  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "20px",
      }}
      id="printable"
      className="h-[750px] w-[850px] overflow-y-auto rounded-md bg-white p-8 shadow-lg text-sm"
    >
      <div>
        <h2 className="text-xl font-bold mb-2">NON-DISCLOSURE AGREEMENT</h2>
        <br />
      </div>

      <div>
        <p>This is contract form testing.</p>

      </div>

      <div className="flex flex-row">
        {/* Shah's Signature /}
        <div className="w-1/2 mt-4 font-bold">
          <div className="mb-4 flex flex-row">
            <label className="pt-10 pr-2">Pulp Signature:</label>
            <div>
              <SignatureCanvas
                backgroundColor="#F3F4F6"
                canvasProps={{ width: 200, height: 50 }}
              />
            </div>
          </div>
        </div>

        {/ Recipient's Signature */}
        <div className="w-1/2 mt-4 font-bold py-2">
          <div className="mb-4 flex flex-row">
            <label className="pt-10 pr-2">Recipient Signature:</label>
            <SignatureCanvas
              ref={canvasRef}
              backgroundColor="#F3F4F6"
              canvasProps={{ width: 200, height: 50 }}
            />
          </div>
          <label>Print Name: {printName || "[Name]"}</label>
          <br />
          <label>Date: {date || "[Date]"}</label>
          <br />
        </div>
      </div>
    </div>
  );
};

export default ContractTesting; 