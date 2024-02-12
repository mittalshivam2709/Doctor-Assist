import React, { useState } from 'react';
import ReactDom from "react-dom/client";
import ExpandingBox from './components/dropdownComponent';

const FirstColumnComponent = () => {
    

  const options = ['Option 1', 'Option 2', 'Option 3'];
    return (
      <p>
       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
        malesuada, tellus nec aliquet interdum, turpis massa vulputate felis,
        non facilisis nulla tortor eu nulla. Nunc in nisi mauris. Vivamus auctor
        tortor quis nunc aliquet, consectetur semper turpis hendrerit.
        Pellentesque et aliquam urna. Proin in elit vestibulum urna vehicula
        auctor. Sed non diam odio. Cras non eleifend leo. Pellentesque in nibh
        eu enim semper luctus. Vivamus vel hendrerit lectus. Ut quis justo sit
        amet diam tristique cursus. Cras luctus varius molestie. Sed luctus
        vulputate urna cursus ornare. Vivamus faucibus in ex at commodo. Quisque
        feugiat tellus at enim eleifend dictum. Integer aliquam erat suscipit
        tellus consequat, vitae placerat leo elementum. Cras est augue, rhoncus
        eu lorem in, interdum imperdiet lorem. Nam scelerisque tincidunt augue,
        a condimentum nunc vulputate in. Vivamus nunc nunc, pharetra nec ex
        sodales, maximus eleifend eros. Vestibulum finibus lacinia malesuada.
        Donec id condimentum dui, ac finibus elit. Vivamus nec quam eget velit
        placerat suscipit. Ut posuere interdum nisi, non aliquet ligula
        consequat vitae. In hendrerit nunc vel enim consectetur iaculis. Nullam
        molestie facilisis tortor. Ut auctor at orci eget molestie. Etiam
        pharetra nisl ut accumsan semper. Mauris at dapibus tortor, nec
        ultricies metus. Duis scelerisque diam nec risus pellentesque faucibus.
        Sed sed blandit mauris. Vivamus congue magna non tristique accumsan.
      </p>
    );
  };

function Greeting() {

  return (
    <div className="flex-container">
      <div className="column">
        
        <FirstColumnComponent />
      </div>
      <div className="column">
      <h1>Expanding Box Example</h1>
      <ExpandingBox
        title="Click to Expand"
        content="This is the content that expands when clicked."
      />
      <ExpandingBox
        title="Click to Expand"
        content="This is the content that expands when clicked."
      />
      <ExpandingBox
        title="Click to Expand"
        content="This is the content that expands when clicked."
      />
      <ExpandingBox
        title="Click to Expand"
        content="This is the content that expands when clicked."
      />
      <ExpandingBox
        title="Click to Expand"
        content="This is the content that expands when clicked."
      />
      <ExpandingBox
        title="Click to Expand"
        content="This is the content that expands when clicked."
      />
      <ExpandingBox
        title="Click to Expand"
        content="This is the content that expands when clicked."
      />
      <ExpandingBox
        title="Click to Expand"
        content="This is the content that expands when clicked."
      />
      <ExpandingBox
        title="Click to Expand"
        content="This is the content that expands when clicked."
      />
      <ExpandingBox
        title="Click to Expand"
        content="This is the content that expands when clicked."
      />
      </div>
    </div>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(<Greeting />);
