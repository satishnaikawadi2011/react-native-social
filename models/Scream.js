class Scream {
	constructor(id, body, likeCount, commentCount, username, userImage, createdAt) {
		(this.id = id),
			(this.body = body),
			(this.commentCount = commentCount),
			(this.likeCount = likeCount),
			(this.username = username),
			(this.createdAt = createdAt),
			(this.userImage = userImage);
	}
}

export default Scream;
