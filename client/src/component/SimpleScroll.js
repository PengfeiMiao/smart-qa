import React, {useEffect, useRef, useState} from 'react';
import {Box} from "@chakra-ui/react";
import _ from 'lodash';
import moment from "moment";

const firstPage = 1;
let preHeight = 0;
let nextScrollTop = 0;
let preScrollTop = 0;
let preLoaderTop = 0;
let maxScrollTop = 0;
let maxCounter = 0;
let slideCounter = 0;
let slideTime = moment().valueOf();

const SimpleScroll = (props) => {
  const [parentNode, setParentNode] = useState();
  const ref = useRef(null);
  const loaderRef = useRef(null);
  const cacheHistories = [];

  const handleScrollToBottom = _.throttle(() => {
    props.handleNext();
  }, 1000);

  useEffect(() => {
    const node = props?.scrollableTarget ?? (ref.current?.parentNode);
    setParentNode(node);
  }, []);

  useEffect(() => {
    const scrollListener = (e) => {
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

        // 根据 loader与scroll的相对位置 预测下一次翻页位置
        const scrollTop = scrollingElement.scrollTop;
        const loaderTop = loaderRef?.current?.getBoundingClientRect().top ?? 0;
        if (nextScrollTop === 0 && props.currentPage === firstPage) {
          nextScrollTop = loaderTop + scrollTop - scrollingElement.clientHeight + props?.moreHeight ?? 0;
        }
        if (loaderTop - preLoaderTop > 1000 && props.currentPage !== firstPage) {
          nextScrollTop = loaderTop - preLoaderTop + scrollTop;
        }
        // 根据 持续滚动的行为 触发下一次翻页
        slideCounter = scrollTop > preScrollTop ? slideCounter + scrollTop - preScrollTop : 0;
        if (slideCounter === 0) {
          slideTime = moment().valueOf();
        }
        // 根据到达 当前最大值的次数 触发下一次翻页
        if (maxScrollTop === scrollTop) {
          maxCounter++;
        }
        if (maxScrollTop < scrollTop) {
          maxScrollTop = scrollTop;
        }
        // 已访问页过滤
        if (
          !cacheHistories.includes(props.currentPage + 1) &&
          (
            (scrollTop + scrollingElement.clientHeight >= scrollingElement.scrollHeight - 1)
            || scrollTop > nextScrollTop
            || (maxCounter > 0 && scrollTop > nextScrollTop - 1000 && moment().valueOf() - slideTime > 30
               && Math.floor(slideCounter / ((moment().valueOf() - slideTime) || 1) * 10) > 3)
          )
        ) {
          cacheHistories.push(props.currentPage + 1);
          // 未访问页节流
          handleScrollToBottom();
          slideCounter = 0;
          maxCounter = 0;
        }
        preLoaderTop = loaderTop;
        preScrollTop = scrollTop;
      }
    };
    if (parentNode && props.currentPage === firstPage) {
      parentNode.scrollTop = 0;
    }
    if (parentNode && props.currentPage && props.hasMore) {
      window.addEventListener('scroll', scrollListener);
      return () => {
        window.removeEventListener('scroll', scrollListener);
        console.log(cacheHistories);
      };
    }
  }, [parentNode, props?.scrollableTarget, props.currentPage, props.hasMore]);

  return (
    <Box ref={ref} pb={'20px'} width={'100%'}>
      {props.children}
      {props.hasMore &&
        <Box ref={loaderRef}
             display={'flex'}
             mt={'20px'}
             alignItems={'center'}
             justifyContent={'center'}
        >{props.loader}</Box>
      }
    </Box>
  );
};

export default SimpleScroll;
