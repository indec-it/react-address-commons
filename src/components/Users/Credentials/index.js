/* global window */
import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Grid, Image, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {IconButton} from '@indec/react-commons';
import {head} from 'lodash';

import {getRoleName} from '../../../util';
import {requestUser} from '../../../actions';
import credential from '../../../images/credential.jpg';
import {User} from '../../../model';

const invalidFile = () => window.alert('Solo formato PNG son admitidos');

class Credentials extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            files: null
        };
    }

    componentDidMount() {
        this.props.requestUser(this.props.match.params.id);
    }

    onDrop(files) {
        const firstFile = head(files);
        if (firstFile) {
            this.setState(() => ({
                files: Object.assign(firstFile, {
                    preview: URL.createObjectURL(firstFile)
                })
            }));
        }
    }

    render() {
        const {userProfile, url, title} = this.props;
        const {files} = this.state;
        return (
            <Fragment>
                {userProfile && (
                    <Grid className="credentials">
                        <Image src={credential} className="image"/>
                        {!files && (
                            <Dropzone
                                onDrop={e => this.onDrop(e)}
                                accept="image/png"
                                onDropRejected={() => invalidFile()}
                            >
                                {({getRootProps, getInputProps}) => (
                                    <div
                                        // eslint-disable-next-line
                                        {...getRootProps()}
                                        className="dropzonestyle"
                                    >
                                        {/* eslint-disable-next-line */}
                                        <input {...getInputProps()}/>
                                        <p>Haga Click o Arrastre para agregar una Foto</p>
                                    </div>
                                )}
                            </Dropzone>
                        )}
                        {files && (
                            <Fragment>
                                <Image className="avatar" src={files.preview}/>
                                <IconButton
                                    icon={faTimesCircle}
                                    onClick={() => this.setState(() => ({files: null}))}
                                    className="hidden-print"
                                />
                                <Button className="print hidden-print" onClick={() => window.print()}>Imprimir</Button>
                            </Fragment>
                        )}
                        <div className="personal-information">
                            <div className="surname">
                                <span className="text-lg">
                                    {userProfile.surname}
                                </span>
                            </div>
                            <div className="name">
                                <span className="text-lg">
                                    {userProfile.name}
                                </span>
                            </div>
                        </div>
                        <div className="id">
                            <span className="text-xsm">
                                {getRoleName(userProfile)}
                            </span>
                            <br/>
                            <span className="text-sm dni">
                                {userProfile.documentId}
                            </span>
                        </div>
                        <div className="title">
                            <span className="text-title">
                                {title}
                            </span>
                        </div>
                        <p className="url">
                            {url}
                        </p>
                    </Grid>
                )}
            </Fragment>
        );
    }
}

Credentials.propTypes = {
    requestUser: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    userProfile: PropTypes.instanceOf(User)
};

Credentials.defaultProps = {
    userProfile: null
};

export default connect(
    state => ({
        userProfile: state.user.user
    }),
    {requestUser}
)(Credentials);
