import React, { useState } from 'react';
import { Icon, Button } from 'semantic-ui-react';

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  // https://www.w3schools.com/howto/howto_js_scroll_to_top.asp

  window.onscroll = function () {
    scrollFunction();
  };
  function scrollFunction() {
    // 滑到某個高度時出現
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  // 將高度設為 0 , 回到頂端
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  // 按鈕固定在某個位置
  const style1 = {
    position: 'fixed',
    bottom: '10px',
    // left: '10px',
    right: '10px',
    zIndex: '99' /* Make sure it does not overlap */,
  };

  // 在滑到某個高度時出現
  return (
    visible && (
      <Button
        size="small"
        color="pink"
        style={style1}
        onClick={topFunction}
        icon="arrow up"
      ></Button>
    )
  );
}
