import React from 'react';

function MainComponentSubcomponent({key, content}) {

    //console.log("In MainComponentSubcomponent:", content);
    switch(content.type) {
        case 'text':
            if (content.isHeader === "true") {
                //width is 2/3. therefore, sub-component-large
                return (
                    <div className='sub-component-large'>
                        <h1>{content.content.heading}</h1>
                        <p className="sub-component-large-header" dangerouslySetInnerHTML={{ __html: content.content.para }} />
                    </div>
                );
            }
            return <div className="sub-component-large">
                        <p dangerouslySetInnerHTML={{ __html: content.content }} />
                    </div>;
        case 'image':
            return <img src={"images/"+content.content} alt="Image" className="sub-component-small" />;
    }
    //return <div className="sub-component-small">Unknown content type</div>;
        
}

export default MainComponentSubcomponent