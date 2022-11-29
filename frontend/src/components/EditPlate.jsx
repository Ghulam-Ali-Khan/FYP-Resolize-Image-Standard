import React from 'react'
import cropImg from '../imgs/crop2.png';
import resizeImg from '../imgs/resize.png';
import filterImg from '../imgs/filters.png';
import resolizeImg from '../imgs/resolize.png';
import removerImg from '../imgs/remover.png';
import layerImg from '../imgs/layer.png';
import flipImg from '../imgs/flip.png';
import textImg from '../imgs/text.png';
import shapesImg from '../imgs/shapes.png'


const EditPlate = () => {
  return (
    <>
    
    <div className="editor-plate drop-shadow-lg" id="editorPlate">
        <div className="plate">
            <div className="custom-row">
            <button>
            <img src={resizeImg} alt="resize" />
                Resize
            </button>
            <button>
            <img src={resolizeImg} alt="resolize" />
                Resolize
            </button>
            <button>
                <img src={cropImg} alt="crop" />
                Crop
            </button>
            </div>


            <div className="custom-row">
            <button>
            <img src={removerImg} alt="remover" />
                Remover
            </button>
            <button>
            <img src={layerImg} alt="layer" />
                Overlayer
            </button>
            <button>
            <img src={filterImg} alt="filter" />
                Filters
            </button>
            </div>

            <div className="custom-row">
            <button>
            <img src={flipImg} alt="flip" />
                Flip
            </button>
            <button>
            <img src={textImg} alt="text" />
                Text
            </button>
            <button>
            <img src={shapesImg} alt="shapes" />
                Shapes
            </button>
            </div>


        </div>
    </div>
    
    </>
  )
}

export default EditPlate