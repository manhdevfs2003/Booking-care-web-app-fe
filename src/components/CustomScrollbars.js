import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./CustomScrollbars.scss";

class CustomScrollbars extends Component {
  ref = React.createRef();

  state = {
    showScrollButton: false, // Trạng thái hiển thị nút scroll-to-top
  };

  getScrollLeft = () => {
    return this.ref.current?.getScrollLeft();
  };

  getScrollTop = () => {
    return this.ref.current?.getScrollTop();
  };

  handleScroll = () => {
    if (!this.ref.current) return;

    const scrollTop = this.ref.current.getScrollTop();
    this.setState({ showScrollButton: scrollTop > 300 });
  };

  scrollToTop = () => {
    this.scrollTo(0);
  };

  scrollToBottom = () => {
    if (!this.ref.current) return;
    const targetScrollTop = this.ref.current.getScrollHeight();
    this.scrollTo(targetScrollTop);
  };

  scrollTo = (targetTop) => {
    if (!this.ref.current) return;

    const scrollbars = this.ref.current;
    const originalTop = scrollbars.getScrollTop();
    let iteration = 0;

    const scroll = () => {
      iteration++;
      if (iteration > 30) return;

      scrollbars.scrollTop(
        originalTop + ((targetTop - originalTop) / 30) * iteration
      );

      setTimeout(() => {
        scroll();
      }, 0);
    };

    scroll();
  };

  renderTrackHorizontal = (props) => (
    <div {...props} className="track-horizontal" />
  );
  renderTrackVertical = (props) => (
    <div {...props} className="track-vertical" />
  );
  renderThumbHorizontal = (props) => (
    <div {...props} className="thumb-horizontal" />
  );
  renderThumbVertical = (props) => (
    <div {...props} className="thumb-vertical" />
  );
  renderNone = (props) => <div />;

  render() {
    const {
      className,
      disableVerticalScroll,
      disableHorizontalScroll,
      children,
      ...otherProps
    } = this.props;
    const { showScrollButton } = this.state;

    return (
      <div className="custom-scroll-wrapper">
        <Scrollbars
          ref={this.ref}
          autoHide={true}
          autoHideTimeout={200}
          hideTracksWhenNotNeeded={true}
          className={
            className ? `${className} custom-scrollbar` : "custom-scrollbar"
          }
          {...otherProps}
          renderTrackHorizontal={
            disableHorizontalScroll
              ? this.renderNone
              : this.renderTrackHorizontal
          }
          renderTrackVertical={
            disableVerticalScroll ? this.renderNone : this.renderTrackVertical
          }
          renderThumbHorizontal={
            disableHorizontalScroll
              ? this.renderNone
              : this.renderThumbHorizontal
          }
          renderThumbVertical={
            disableVerticalScroll ? this.renderNone : this.renderThumbVertical
          }
          onScrollFrame={this.handleScroll} // Lắng nghe sự kiện cuộn
        >
          {children}
        </Scrollbars>

        {/* Nút cuộn lên đầu */}
        <button
          className={`scroll-to-top ${showScrollButton ? "visible" : ""}`}
          onClick={this.scrollToTop}
        >
          <i className="fa fa-chevron-up"></i>
        </button>
      </div>
    );
  }
}

export default CustomScrollbars;
