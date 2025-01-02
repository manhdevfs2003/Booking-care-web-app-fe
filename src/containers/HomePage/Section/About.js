import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {

        return (
            <div className='section-share section-about '>
                <div className='section-about-header'>
                    Truyền thông nói về Booking care
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/H08YWE4CIFQ?list=RDGMEMCMFH2exzjBeE_zAHHJOdxgVMH08YWE4CIFQ"
                            title="なとり - Overdose" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>Với giải vở thực hành Ngữ Văn lớp 6 Kết nối tri thức hay nhất, chi tiết đầy đủ Tập 1 và Tập 2 giúp học sinh dễ dàng làm bài tập trong VTH Ngữ Văn 6 từ đó học tốt môn Văn 6.</p>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
