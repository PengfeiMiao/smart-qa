import React, {useEffect, useRef, useState} from 'react';
import {Box} from "@chakra-ui/react";
import _ from 'lodash';

const firstPage = 1;
let preHeight = 0;

const SimpleScroll = (props) => {
  const [parentNode, setParentNode] = useState();
  const ref = useRef(null);

  useEffect(() => {
    const node = props?.scrollableTarget ?? (ref.current?.parentNode);
    setParentNode(node);
  }, []);

  useEffect(() => {
    const scrollListener = (e) => {
      const handleScrollToBottom = _.throttle(() => {
        props.handleNext();
      }, 300);

      if (e && e.target && e.target.scrollingElement) {
        const scrollingElement = e.target.scrollingElement;
        if (preHeight !== scrollingElement.scrollHeight) {
          if (parentNode) {
            parentNode.scrollTop = preHeight;
          }
          preHeight = scrollingElement.scrollHeight;
          return;
        }
        preHeight = scrollingElement.scrollHeight;
        console.log(scrollingElement.scrollTop + scrollingElement.clientHeight, scrollingElement.scrollHeight);
        if (
          scrollingElement.scrollTop + scrollingElement.clientHeight + (props?.moreHeight ?? 0)
          >= scrollingElement.scrollHeight - 1
        ) {
          handleScrollToBottom();
        }
      }
    };
    if (parentNode && props.currentPage === firstPage) {
      parentNode.scrollTop = 0;
    }
    if (parentNode && props.currentPage && props.hasMore) {
      window.addEventListener('scroll', scrollListener);
      return () => {
        window.removeEventListener('scroll', scrollListener);
      };
    }
  }, [parentNode, props?.scrollableTarget, props.currentPage, props.hasMore]);

  return (
    <Box ref={ref} pb={'20px'}>
      {props.children}
      {props.hasMore && props.loader}
    </Box>
  );
};

export default SimpleScroll;
