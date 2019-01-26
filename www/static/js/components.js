const lang = {
	"e":"English",
	"j":"日本語"
}

const sentences = [
	{e: 'I really love ice-cream',j:'私はアイスクリームが大好きだよ！','c':10},
	{e: 'Is tomorrow Sunday?',j:'明日、日曜日ですか。','c':5}
]

class Lang extends React.Component {
	render() {
		return (
			<p className='langP' lang={this.props.lang == 'j' ? 'ja-jp' : 'en-us'}>{lang[this.props.lang]}</p>
		)
	}
};

class SentenceApp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			'sl':'e',
			'comp': 8,
			'reveal': false,
			'sp':''
		} 
		this.handleLangChange = this.handleLangChange.bind(this)
		this.handleComplexityChange = this.handleComplexityChange.bind(this)
		this.handleRevealChange = this.handleRevealChange.bind(this)
		this.returnRandomSentence = this.returnRandomSentence.bind(this)
	}

	handleLangChange() {
		this.state.sl == 'e' ? this.setState({'sl':'j'}) : this.setState({'sl':'e'})
	}

	handleComplexityChange(level) {
		this.setState({'comp': parseInt(level)})
		var rsp = this.returnRandomSentence(level)
	}

	handleRevealChange(oldState) {
		if(oldState) {this.setState({reveal:false})} else {this.setState({reveal:true})}
	}

	componentDidMount() {
		this.returnRandomSentence(this.state.comp)
	}

	returnRandomSentence(complexity) {
		var that = this
		var xhttp = new XMLHttpRequest()
		xhttp.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(xhttp.responseText)
				that.setState({'sp':data})
			}
		}
		xhttp.open("GET","/get-sentence-pair?comp="+complexity,true)
		xhttp.send()
	}

	render() {
		return (
			<div className='test'>
				<SourceLang sl={this.state.sl} onLangChange={this.handleLangChange}/>
				<SentenceBox
				reveal={this.state.reveal}
				onRevealChange={this.handleRevealChange}
				sp = {this.state.sp}
				sl = {this.state.sl}/>
				<ComplexityBox
				onComplexityChange={this.handleComplexityChange}/>
			</div>
		)
	}
}

class SourceLang extends React.Component {
	constructor(props) {
		super(props)
		this.getTargetLang = this.getTargetLang.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	getTargetLang() {
		return this.props.sl == 'e' ? 'j' : 'e'
	}

	handleChange() {
		this.props.onLangChange()
	}

	render() {
		var target = this.getTargetLang()
		return (
			<div id='langDiv'>
				<Lang lang={this.props.sl} key='sourceP'/>
				<button onClick={this.handleChange}>Switch 換える</button>
				<Lang lang={target} key='targetP'/>
			</div>
		)
	}
}


class Sentence extends React.Component {
	render() {
		return (
			<p className='sentP'>{this.props.sent}</p> 
		)
	}
}

class SentenceBox extends React.Component {
	constructor(props) {
		super(props)
		this.handleRevealChange = this.handleRevealChange.bind(this)
	}

	handleRevealChange() {
		this.props.onRevealChange(this.props.reveal)
	}

	render() {
		var isReveal = this.props.reveal
		var tl = (this.props.sl == 'e') ? 'j' : 'e'
		console.log(this.props.sp[this.props.sl])
		return (
			<div id='sentDiv'>
				<Sentence sent={this.props.sp[this.props.sl]} />
				<button onClick={this.handleRevealChange}>{isReveal ? 'Hide 隠す' : 'Reveal 見せる'}</button>
				{isReveal ? (
					<Sentence sent={this.props.sp[tl]} />
				) : null}
			</div>
		)
	}
}

class ComplexityBox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {value: 8}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		var newVal = event.target.value
		this.setState({value: newVal})
		this.props.onComplexityChange(newVal)
	}

	render () {
		return (
			<div id='compDiv'>
				<p className='diffP'>Complex 複雑</p> 
				<input className='slider' type="range" value={this.state.value} min="5" max="15" onChange={this.handleChange}></input>
				<p className='diffP'>Simple 単純</p>
			</div>
		)
	}
}

ReactDOM.render(
	<SentenceApp />,
	document.getElementById('root')
)