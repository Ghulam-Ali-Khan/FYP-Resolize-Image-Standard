import React from "react";
import worksImg from "../imgs/how-it-works.png";
import dndImg from "../imgs/drag-and-drop.png";
import editingImg from "../imgs/image-editing.png";
import downloadImg from "../imgs/cloud-computing.png";

const Works = () => {
  return (
    <>
      <div className="how-it-works">
        <div className="flex">
          <div className="img">
            <img src={worksImg} alt="How it works" />
          </div>

          <div className="content">
            <h2>How It Works</h2>
            
            <p>Resolize Image Standard is a product anyone can use easily and we can save time and money.</p>
            <div className="flex gap-3 my-1">
            <img src={dndImg} />
            <p>
              Step-1 is to Upload image you can do this by drap and drop or choose file.
            </p>
            </div>
            <div className="flex gap-3 my-1">
            <img src={editingImg} />
            <p>
             Step-2 is to do modifications you wanted on your image.
            </p>
            </div>
            <div className="flex gap-3 my-1">
            <img src={downloadImg} />
            <p>
             Step-3 after completing modifications you can simply download your image.
            </p>
            </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default Works;
