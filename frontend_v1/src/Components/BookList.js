import React from "react";

export default class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list:props.list, currentBook:''};
        this.setCurrentBook=this.setCurrentBook.bind(this);
        this.changeBook=this.changeBook.bind(this);
    }

    changeBook(e) {
        var mybook = this.state.currentBook;
        if (e.target.id === "bname") {
            mybook.name = e.target.value;
        }
        else if (e.target.id === "bauthor") {
            mybook.author = e.target.value;
        }
        else if (e.target.id === "binfo") {
            mybook.info = e.target.value;
        }
        else if (e.target.id === "bprice") {
            mybook.price = e.target.value;
        }


        let list2 = this.state.list;
        list2[mybook.id-1] = mybook;
        this.setState({currentBook:mybook, list:list2});

    }

    setCurrentBook(e) {
        this.setState({currentBook:this.state.list[e.target.value]});
    }

    componentDidMount() {
        this.setState({currentBook:this.state.list[0]});
    }

    render() {
        return (
          <div className="row h-100">
            <div className="col-6">
                <ul>
                    {this.state.list.map((book, index) => {
                        return <li key={index} value={index} onClick={this.setCurrentBook}>
                            {book.name}
                        </li>
                    })}
                </ul>
            </div>
            <div className="col-6">
                Book Name <input id="bname" onChange={this.changeBook} value={this.state.currentBook.name || ""}/><br/>
                Book Author <input id="bauthor" onChange={this.changeBook} value={this.state.currentBook.author || ""}/><br/>
                Book Info <input id="binfo" onChange={this.changeBook} value={this.state.currentBook.info || ""}/><br/>
                Book Price <input id="bprice" onChange={this.changeBook} value={this.state.currentBook.price || ""}/><br/>
            </div>
          </div>
        );
    }
}

export {BookList}
