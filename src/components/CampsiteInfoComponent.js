import React, { Component } from 'react';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Label,
	Col,
	Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;
class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			isToggle: false,
			rating: '5',
			author: '',
			text: '',
			touched: {
				author: false,
				text: false,
			},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(values) {
		console.log('Current state is: ' + JSON.stringify(values));
		alert('Current state is: ' + JSON.stringify(values));
	}
	toggleModal = () => {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	};
	render() {
		return (
			<div className="col-md-5 m-1">
				<Button outline className="secondary fa-lg" onClick={this.toggleModal}>
					<i className="fa fa-pencil" />
					Submit Comment
				</Button>
				<Modal isOpen={this.state.isOpen} isToggle={this.state.isToggle}>
					<ModalHeader isToggle={this.state.isToggle}>
						Submit Comment
					</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={values => this.handleSubmit(values)}>
							<Row className="form-group">
								<Col md={{ size: 10 }}>
									<Label id="rating">Rating</Label>
									<Control.select
										model=".rating"
										id="rating"
										name="rating"
										className="form-control"
									>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Col md={{ size: 10 }}>
									<Label id="author">Author</Label>
									<Control.text
										model=".author"
										id="author"
										name="author"
										placeholder="Author Name"
										className="form-control"
										validators={{
											required,
											minLength: minLength(2),
											maxLength: maxLength(15),
										}}
									/>
									<Errors
										className="text-danger"
										model=".author"
										show="touched"
										component="div"
										messages={{
											required: 'Required',
											minLength: 'Must be at least 2 characters',
											maxLength: 'Must enter 15 characters or less',
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Col md={{ size: 10 }}>
									<Label id="text">Text</Label>
									<Control.textarea
										model=".text"
										id="text"
										name="text"
										rows="6"
										placeholder="I like this campsite because..."
										className="form-control"
										validators={{
											required,
											minLength: minLength(2),
											maxLength: maxLength(50),
										}}
									/>
									<Errors
										className="text-danger"
										model=".text"
										show="touched"
										component="div"
										messages={{
											required: 'Required',
											minLength: 'Must be at least 2 characters',
											maxLength: 'Must be 50 or less characters',
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Col md={{ size: 10 }}>
									<Button type="submit" value="submit" color="primary">
										Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}
function RenderCampsite({ campsite }) {
	return (
		<div className="col-md-5 m-1">
			<Card>
				<CardImg width="100%" src={campsite.image} alt={campsite.name} />
				<CardBody>
					<CardText>{campsite.description}</CardText>
				</CardBody>
			</Card>
		</div>
	);
}
function RenderComments({ comments }) {
	if (comments) {
		return (
			<div className="col-md-5 m-1">
				<h4>Comments</h4>
				{comments.map(comment => {
					return (
						<div className="mb-2">
							<div>{comment.text}</div>
							<div>
								<span>-- {comment.author}, </span>
								{new Intl.DateTimeFormat('en-US', {
									year: 'numeric',
									month: 'short',
									day: '2-digit',
								}).format(new Date(Date.parse(comment.date)))}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
	return <div />;
}

function CampsiteInfo(props) {
	if (props.campsite) {
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<Breadcrumb>
							<BreadcrumbItem>
								<Link to="/directory">Directory</Link>{' '}
							</BreadcrumbItem>
							<BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
						</Breadcrumb>
						<h2>{props.campsite.name}</h2>
						<hr />
					</div>
				</div>
				<div className="row">
					<RenderCampsite campsite={props.campsite} />
					<RenderComments comments={props.comments} />
				</div>
				<div className="row">
					<CommentForm />
				</div>
			</div>
		);
	}
	return <div />;
}
export default CampsiteInfo;
