'use client';
import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import { image } from 'html2canvas/dist/types/css/types/image';
import { start } from 'repl';
import AWS from 'aws-sdk';





const s3 = new AWS.S3();


const ICAForm = () => { 

  // AWS S3 Configuration for NDA Upload
  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    });    

  const s3 = new AWS.S3();
  
  //Parties
  const [client, setClient] = useState('');
  const [clientAddress, setclientAddress] = useState('');
  const [contractor, setContractor] = useState('');
  const [contractorAddress, setcontractorAddress] = useState('');
  const [date, setDate] = useState('');

  //Services
  const [services, setServices] = useState('');

  //Term
  const [startTerm, setStartTerm] = useState('');
  const [endTerm, setEndTerm] = useState('');
  const [noticeDays, setNoticeDays] = useState('');

  //Payment
  const [payment, setPayment] = useState('');

  //Insurance *radio buttons
  const [selectedInsuranceOption, setSelectedInsuranceOption] = useState<string>('');

  //Expenses * radio buttons
  //const [selectedExpenseOption, setSelectedExpenseOption] = useState<string[]>([]);

  const [selectedExpenseOption, setSelectedExpenseOption] = useState<{ [key: string]: boolean }>({
    Travel: false,
    Meals: false,
    Supplies: false,
  });

  //Governing Law
  const [governingLaw, setGoverningLaw] = useState('');

  //Print Name
  const [printName, setprintName] = useState('');


  const [requiredFields, setRequiredFields] = useState(true);

  //Use state to control signature of the recipient
  //checks if the required fields are filled out
  const canvasRef = useRef<SignatureCanvas>(null);


 // Function to handle changes and validate letter inputs
    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setter == setDate) {
        let value = e.target.value;
        let parts = value.split("-");
        
        if (parts.length > 0 && parts[0].length > 4) {
            parts[0] = parts[0].slice(0, 4); // Restrict year to 4 digits
        }
        
        setDate(parts.join("-"));
        } else {
        const value = e.target.value;
        const filteredValue = value.replace(/[^A-Za-z\s]/g, ''); // Allow only letters and spaces
        setter(filteredValue);
        }
    };
 

  const handleCheckboxChange = (
      setter: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<string[]>>,
      isSingleSelect: boolean
    ) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.target;
    
      if (isSingleSelect) {
        (setter as React.Dispatch<React.SetStateAction<string>>)(checked ? value : ""); // Handle single select
      } else {
        (setter as React.Dispatch<React.SetStateAction<string[]>>)((prev) =>
          checked
            ? [...(Array.isArray(prev) ? prev : []), value] // Add value if checked
            : (Array.isArray(prev) ? prev.filter((opt) => opt !== value) : []) // Remove value if unchecked
        );
      }
    };

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.clear(); // Clear the canvas on parameter change
    }
    if (!client || !contractor || !clientAddress || !contractorAddress || !services || !startTerm || !endTerm || !noticeDays || !selectedInsuranceOption || !selectedExpenseOption  || !governingLaw|| !date ) {
      setRequiredFields(true);
      if (canvasRef.current) {
        canvasRef.current.clear(); // Clear the canvas
        canvasRef.current.off(); // Disable the canvas
      }
    } else {
      setRequiredFields(false);
      if (canvasRef.current) {
        canvasRef.current.on(); // Enable the canvas
      }
    }
  }, [client, contractor, clientAddress, contractorAddress, services, startTerm, endTerm, noticeDays, selectedInsuranceOption, selectedExpenseOption, governingLaw, date]);
  

   // Function to upload the PDF to AWS S3
   const uploadToS3 = async (file: Blob) => {
        const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: `ica-uploads/ICA_Agreement_${Date.now()}.pdf`, // Customize file name
        Body: file,
        ContentType: 'application/pdf',
        };
        try {
        const { Location } = await s3.upload(params).promise();
        alert(`File uploaded successfully to ${Location}`);
        } catch (error) {
        alert('Error uploading file.');
        }
    };

  // Function to handle form submission (upload to AWS)
  const handleSubmit = async () => {
    if (requiredFields) {
      alert('Please fill out all required fields.');
      return;
    }

    const input = document.getElementById("printable") as HTMLElement | null;
    
    if (input) {
      const pdf = new jsPDF("p", "px", "letter");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 40; 
      const contentWidth = pageWidth - 2 * margin; 
      const contentHeight = pageHeight - 2 * margin; 

      // Save original styles
      const originalHeight = input.style.height;
      const originalOverflow = input.style.overflow;
      input.style.height = "auto";
      input.style.overflow = "visible";
      
      const sections = Array.from(input.children);

      let position = margin; // Start at the top margin

      for (const section of sections) {
        const canvas = await html2canvas(section as HTMLElement, {
          scale: 1,
          useCORS: true,
          windowHeight: section.scrollHeight,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.8);
        let imageDataPrinted = 0;
        const aspectRatio = canvas.width / canvas.height;
        
        const imgWidth = contentWidth;
        const imgHeight = imgWidth / aspectRatio;

        let heightLeft = imgHeight;
        while (heightLeft > 0 && imageDataPrinted < 1) {
          const remainingPageHeight = contentHeight - (position - margin);

          if (remainingPageHeight <= 0 || remainingPageHeight < imgHeight) {
            pdf.addPage();
            position = margin; // Reset position
          }

          const currentPageHeight = Math.min(heightLeft, remainingPageHeight);

          pdf.addImage(
            imgData,
            "JPEG",
            margin,
            position,
            imgWidth,
            currentPageHeight
          );
          imageDataPrinted++;
          
          heightLeft -= currentPageHeight;
          position += currentPageHeight;
        }
      }

      // Restore original styles
      input.style.height = originalHeight;
      input.style.overflow = originalOverflow;

      // Convert PDF to Blob
      const pdfBlob = pdf.output("blob");

      // Convert Blob to Base64
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Data = reader.result?.toString().split(",")[1];

        if (!base64Data) {
          alert("Failed to prepare file for upload.");
          return;
        }

        try {
          const fileName = `nda-uploads/NDA_Agreement_${Date.now()}.pdf`;
          const fileType = "application/pdf";

          // ✅ Step 1: Upload to S3
          const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              file: base64Data,
              fileName,
              fileType,
            }),
          });

          if (response.ok) {
            const { url } = await response.json();
            alert(`File uploaded successfully to ${url}`);

            // ✅ Step 2: Send to Neo4j (store S3 link and form data)
            const neo4jResponse = await fetch("/api/neo4j", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: printName,
                address: contractorAddress,
                date: date,
                s3Link: url,
              }),
            });

            if (neo4jResponse.ok) {
              alert("NDA data stored successfully in Neo4j");
            } else {
              const { error } = await neo4jResponse.json();
              console.error("Neo4j storage error:", error);
              alert(`Failed to store NDA data in Neo4j: ${error}`);
            }
          } else {
            const { error } = await response.json();
            console.error("S3 upload error:", error);
            alert(`Error uploading file: ${error}`);
          }
        } catch (error) {
          console.error("File upload failed:", error);
          alert("Failed to upload file.");
        }
      };

      reader.readAsDataURL(pdfBlob);
    }
  };


  const handleDownloadPDF = async () => {
    const input = document.getElementById("printable");
  
    if (input) {
      const pdf = new jsPDF("p", "px", "letter");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 40; 
      const contentWidth = pageWidth - 2 * margin; 
      const contentHeight = pageHeight - 2 * margin; 
  
      const originalHeight = input.style.height;
      const originalOverflow = input.style.overflow;
      input.style.height = "auto";
      input.style.overflow = "visible";
     
      const sections = Array.from(input.children); 
  
      let position = margin; // Start at the top margin
  
      for (const section of sections) {
      
        const canvas = await html2canvas(section as HTMLElement, {
          scale: 1, 
          useCORS: true,
          windowHeight: section.scrollHeight, 
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.8); 
        var imageDataPrinted = 0;
        const aspectRatio = canvas.width / canvas.height;
  
        const imgWidth = contentWidth;
        const imgHeight = imgWidth / aspectRatio;
  
        // If the section is too tall for the current page, split it into multiple pages
        let heightLeft = imgHeight;
        while (heightLeft > 0 && imageDataPrinted < 1) {
          
          const remainingPageHeight = contentHeight - (position - margin);
  
          // If the remaining space is not enough for the current section, move to the next page
          if (remainingPageHeight <= 0 || remainingPageHeight < imgHeight) {
            pdf.addPage();
            position = margin; // Reset 
          }
  
          // Calculate the height of the current page's content
          const currentPageHeight = heightLeft;
  
          // Add the image to the PDF with margins
          pdf.addImage(
            imgData,
            "JPEG", 
            margin,
            position, 
            imgWidth, 
            currentPageHeight, 
            undefined, 
            "FAST" 
          );
          imageDataPrinted++;
      
          heightLeft -= currentPageHeight;
          position += currentPageHeight;
        }
      }
  
      // Restore the original styles
      input.style.height = originalHeight;
      input.style.overflow = originalOverflow;

      pdf.save("ICA_Agreement.pdf");
    }
  };
  return (
    <div className="flex gap-20 p-10 text-black m-auto w-3/4">
      {/* Form Section */}
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">Independent Contractor Agreement</h1>
        <div className="mb-4">
          <label className="label_text">Client</label>
          <input
            type="text"
            className="arg-box"
            pattern="[A-Za-z\s]+"
            value={client}
            onChange={handleInputChange(setClient)}
            maxLength={70}
            required
          />
        </div>
        <div className="mb-4">
          <label className= "label_text">Contractor</label>
          <input
            type="text"
            className="arg-box"
            pattern="[A-Za-z\s]+"
            value={contractor}
            onChange={handleInputChange(setContractor)}
            maxLength={70}
            required
          />
        </div>
        <div className="mb-4">
          <label className="label_text">Client&apos;s Mailing Address</label>
          <input
            type="text"
            className="arg-box"
            value={clientAddress}
            onChange={(e) => setclientAddress(e.target.value)}
            maxLength={100}
            required
          />
        </div>
        <div className="mb-4">
          <label className="label_text">Contractor&apos;s Mailing Address</label>
          <input
            type="text"
            className="arg-box"
            value={contractorAddress}
            onChange={(e) => setcontractorAddress(e.target.value)}
            maxLength={100}
            required
          />
        </div>
        <div className='mb-4'>
          <label className="label_text">Services</label>
          <input 
            type="text"
            className="arg-box"
            value={services}
            onChange={handleInputChange(setServices)}
            maxLength={300}
            required
           />
        </div>
        <div className='mb-4'>
          <label className="label_text">Start Date</label>
          <input 
            type="date" 
            className="arg-box" 
            value={startTerm} 
            onChange={(e) => setStartTerm(e.target.value)}
            max="2999-12-31"
            required
            />
        </div>
        <div className='mb-4'>
          <label className="label_text">End Date</label>
          <input 
            type="date" 
            className="arg-box" 
            value={endTerm} 
            onChange={(e) => setEndTerm(e.target.value)}
            max="2999-12-31"
            required
            />
        </div>
        <div className='mb-4'>
          <label className="label_text">Notice Period (in days)</label>
          <input 
            type="number" 
            className="arg-box" 
            value={noticeDays} 
            onChange={(e) => setNoticeDays(e.target.value)}
            min={1}
            required
          />
        </div>
        <div className='mb-4'>
          <label className="label_text">Payment Amount</label>
          <input 
            type="number" 
            className="arg-box" 
            value={payment} 
            onChange={(e) => setPayment(e.target.value)}
            min={0}
            required
          />
        </div>
        <div className='mb-4'>
          <label className="label_text">
            Insurance Required?
          </label>
          <div className="flex flex-row gap-4">
        {["Yes", "No"].map((option) => (
            <label key={option} className="label_text">
            <input
                type="checkbox"
                value={option}
                checked={selectedInsuranceOption === option} // Control the checkbox state based on selectedInsuranceOption
                onChange={handleCheckboxChange(setSelectedInsuranceOption, true)} // Single select logic
            />
            {option}
            </label>
        ))}
        </div>
        </div>
        <div className='mb-4'>
          <label className="label_text">Expenses</label>
          <div className='flex flex-row gap-4'>
            {["Travel", "Meals", "Supplies"].map((option) => (
              <label key={option} className="flex items-center gap-2 label_text">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedExpenseOption[option]} // Control the checkbox state based on selectedExpenseOption
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    setSelectedExpenseOption((prev) => ({
                      ...prev,
                      [value]: checked,
                    }));
                  }} // Multi-select logic
                />
                {option.charAt(0).toUpperCase() + option.slice(1)} {/* Capitalize first letter */}

              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="label_text">Governing Law</label>
          <input 
            type="text" 
            className="arg-box" 
            value={governingLaw} 
            onChange={handleInputChange(setGoverningLaw)}
            maxLength={70}
            required
          />
        </div>
        <div>

        </div>
        
        <div className='mb-4'>
          <label className="label_text">Effective Date</label>
          <input 
            type="date" 
            className="arg-box" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            max="2999-12-31"
            required
            />
        </div>
        <div className='mb-4'>
          <label className="label_text"> Print Name</label>
          <input 
            type="text" 
            className="arg-box"
            pattern="[A-Za-z\s]+" 
            value={printName}
            onChange={handleInputChange(setprintName)}
            maxLength={70}
            required
            
          />
        </div>
      </div>
      

      <div className="flex flex-col w-full md:w-3/6 justify-start px-4 fixed bottom-200 right-0">
        <div className="flex flex-col w-full md:w-5/5 justify-start px-4">
            {/* Agreement Preview */}
            <div
            id="printable"
            className="h-[750px] w-full max-w-[850px] overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl border border-gray-200 text-gray-800 text-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:border-gray-300"
            >
                <div>
                <h2 className="text-2xl h-[40px] font-bold text-center mb-6 text-gray-900 underline decoration-blue-500 underline-offset-4">Independent Contractor Agreement</h2>
                </div>
            {/* PARTIES */}
            <section className="pb-6 mb-8 border-b border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">1. PARTIES</h3>
            <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Client:</span> <span className="px-2">{client}</span></p>
                <p><span className="font-semibold">Mailing Address:</span> <span className=" px-2">{clientAddress}</span></p>
                <p><span className="font-semibold">Contractor:</span> <span className=" px-2">{contractor}</span></p>
                <p><span className="font-semibold">Mailing Address:</span> <span className=" px-2">{contractorAddress}</span></p>
                <p><span className="font-semibold">Effective Date:</span> <span className=" px-2">{date}</span> </p>
            </div>
            </section>

            {/* SERVICES */}
            <section className="pb-6 mb-8 border-b border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">2. SERVICES</h3>
            <div className="space-y-2 text-gray-700">
                <p>The Contractor agrees to perform the following for the Client:</p>
                <p className="min-h-[10px]">{services}</p>
            </div>
            </section>

            {/* WORK STATUS */}
            <section className="pb-6 mb-8 border-b border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">3. WORK STATUS</h3>
            <p className="text-gray-700 leading-relaxed">
                The Client hereby hires the Contractor as an independent contractor, and the Contractor accepts the terms of the working relationship as set forth herein.
            </p>
            </section>

           {/* TERM */}
            <section className="pb-6 mb-8 border-b border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">4. TERM</h3>
            <div className="space-y-2 text-gray-700">
                <p>
                This Agreement shall commence on
                <span className="inline-block min-w-[150px]  mx-2">
                    {startTerm || "[Start Date] "} 
                and end on 
               
                    {endTerm || " [End Date]"}
                </span>
                
                </p>
                <p>
                In the event of a material breach, either party may terminate the Agreement prior to the end of the term by giving 
                <span className="inline-block min-w-[80px]  mx-2">
                    {noticeDays || "[Notice Days]"}
                </span>
                (#) days’ written notice to the other party.
                </p>
            </div>
            </section>

            {/* PAYMENT */}
            <section className="pb-6 mb-8 border-b border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">5. PAYMENT</h3>
            <div className="space-y-2 text-gray-700">
                <p>In consideration for the Services to be performed by the Contractor, the Client shall pay the Contractor in the following manner:</p>
                <p className="min-h-[40px]">{payment || "[Payment]"}</p>
            </div>
            </section>

             {/* INSURANCE PREVIEW SECTION */}
            <section className="pb-6 mb-8 border-b border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Preview</h3>
                <p className="text-gray-700 leading-relaxed">
                The Contractor shall{" "}
                <span className="font-semibold">
                    {selectedInsuranceOption === "Yes" ? "☑" : "☐"}{" "}
                    to have insurance attributed to their services provided.
                </span>
                </p>
            </section>

            {/* EXPENSES */}
            <section className="pb-6 mb-8 border-b border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">7. EXPENSES</h3>
            <p className="text-gray-700 leading-relaxed">
                The Client will reimburse the Contractor for the following expenses:
            </p>
                <ul className='flex flex-row gap-8 text-gray-700'>
                {Object.entries(selectedExpenseOption).map(([option, isChecked]) => (
                    <li key={option}>
                    {isChecked ? `${option.charAt(0).toUpperCase() + option.slice(1)} ☑` : `${option.charAt(0).toUpperCase() + option.slice(1)} ☐`}
                    </li>
                ))}
                </ul>
            </section>

            {/* LEGAL NOTICE */}
            <section className="pb-6 mb-8 border-b border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">8. LEGAL NOTICE</h3>
            <p className="text-gray-700 leading-relaxed">
                All notices required or permitted to be given hereunder shall be in writing and may be delivered personally or by Certified Mail – Return Receipt Requested, postage prepaid, addressed to the applicable address listed in Section 1.
            </p>
            </section>

            {/* INDEMNIFICATION */}
            <section className="pb-6 mb-8 border-b border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">9. INDEMNIFICATION</h3>
            <p className="text-gray-700 leading-relaxed">
                The Contractor shall indemnify and hold the Client harmless from any loss or liability from performing the Services under this Agreement.
            </p>
            </section>

            {/* RELATIONSHIP DEFINED */}
            <section className="pb-6 mb-8 border-b border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">10. RELATIONSHIP DEFINED</h3>
            <p className="text-gray-700 leading-relaxed">
                Nothing in this Agreement shall indicate the Contractor is a partner, agent, or employee of the Client.
            </p>
            </section>

            {/* GOVERNING LAW */}
            <section className="pb-6 mb-8 border-b border-gray-200">
            <div className="space-y-2 text-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">11. GOVERNING LAW</h3>
                <p>This Agreement shall be governed under the laws of the State of</p>
                <p className=" min-h-[40px]">{governingLaw || '[Governing Law]'}</p>
            </div>
            </section>

            {/* SIGNATURES */}
            <div className='flex flex-row '>
                <div className='w-1/2 mt-4 font-bold'> {/*Shahs Signature*/}
                    <div className='mb-4 flex flex-row'>
                    <label className='pt-10 pr-2'> Pulp Signature:</label>
                    <div>
                        <SignatureCanvas 
                        backgroundColor='#F3F4F6' 
                        canvasProps={{ width: 200, height: 50 }
                        
                    }  
                    />
                    </div>
                    
                    </div>
                </div>
                <div className='w-1/2 mt-4 font-bold py-2'> {/*Recipient's signature*/}
                    <div className='mb-4 flex flex-row'>
                    <label className='pt-10 pr-2'>Recipient Signature:</label>
                    <SignatureCanvas
                        ref={canvasRef} 
                        backgroundColor='#F3F4F6' 
                        canvasProps={{ width: 200, height: 50 }}  
                    />
                    </div>
                    <label>Print Name: {printName || "[Name]"}</label>
                    <br />
                     <span className="inline-block min-w-[150px] ">
                        Date: {date }
                    </span>
                    
                    <br />
                </div>
                
                
                </div>
            </div>

            
            <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleDownloadPDF}
            >
            Download PDF
            </button>
        </div>

      </div>
      
  </div>
  );
};

export default ICAForm;
