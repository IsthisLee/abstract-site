class Site {
    constructor() {
        this.boards = [];
    }

    addBoard(newBoard) {
        this.boards.forEach((board) => {
            if (board.name === newBoard.name) {
                throw new Error('동일한 이름의 Board가 존재합니다.');
            }
        });
        this.boards.push(newBoard);
        newBoard.inSite = true;
    }

    findBoardByName(boardName) {
        let answer;
        this.boards.forEach((board) => {
            if (board.name === boardName) {
                answer = board;
            }
        });
        if (answer) {
            return answer;
        }
        throw new Error('존재하지 않는 Board입니다.');
        // let titles = [];
        // let index;
        // this.boards.forEach((board) => titles.push(board.name));
        // index = titles.indexOf(boardName);
        // if (index !== -1) {
        //     return this.boards[index];
        // }
        // throw new Error('존재하지 않는 Board입니다.');
    }
}

class Board {
    constructor(name) {
        if (name === '' || name === null) {
            throw new Error('Board 제목에 null또는 빈 문자열은 허용되지 않습니다.');
        }
        this.name = name;
        this.articles = [];
        this.inSite = false;
    }

    publish(newArticle) {
        if (this.inSite) {
            newArticle.id = this.name + '-' + Math.random();
            newArticle.createdDate = new Date().toISOString();
            newArticle.inBoard = true;
            this.articles.push(newArticle);
            return;
        }
        throw new Error('Board가 Site에 추가되지 않아 Article을 추가할 수 없습니다.');
    }

    getAllArticles() {
        return this.articles;
    }
}

class Article {
    constructor({ subject, content, author }) {
        if (
            !subject ||
            !content ||
            !author ||
            subject === null ||
            subject === ' ' ||
            content === null ||
            content === ' ' ||
            author === null ||
            author === ' '
        ) {
            throw new Error(
                'Article은 subject, content, author 3개의 데이터를 포함해야 하며 null 또는 빈 문자열("")은 허용하지 않는다',
            );
        }
        this.inBoard = false;
        this.comment = [];
    }

    reply(comment) {
        if (!this.inBoard) {
            throw new Error(
                'Board에 추가된 Article만 사용 가능한 것으로 간주하며 사용 불가능한 Article에는 Comment를 추가할 수 없다.',
            );
        }
        comment.createdDate = new Date().toISOString();
        this.comment.push(comment);
    }

    getAllComments() {
        return this.comment;
    }
}

class Comment {
    constructor({ content, author }) {
        if (!content || !author || content === '' || content === null || author === '' || author === null) {
            throw new Error(
                'Comment는 content, author 2개의 데이터를 포함해야 하며 null 또는 빈 문자열("")은 허용하지 않는다.',
            );
        }
    }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
