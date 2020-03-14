// Generated from C:/Users/Davide/Desktop/progetto_linguaggi/imp/src\Imp.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class ImpLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.7.2", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		NAT=1, BOOL=2, PLUS=3, MINUS=4, MUL=5, DIV=6, MOD=7, POW=8, AND=9, OR=10, 
		EQQ=11, NEQ=12, LEQ=13, GEQ=14, LT=15, GT=16, NOT=17, IF=18, THEN=19, 
		ELSE=20, WHILE=21, SKIPP=22, ASSIGN=23, OUT=24, FOR=25, DO=26, ND=27, 
		ELSEIF=28, LPAR=29, RPAR=30, LBRACE=31, RBRACE=32, SEMICOLON=33, COMMA=34, 
		ID=35, WS=36;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"NAT", "BOOL", "PLUS", "MINUS", "MUL", "DIV", "MOD", "POW", "AND", "OR", 
			"EQQ", "NEQ", "LEQ", "GEQ", "LT", "GT", "NOT", "IF", "THEN", "ELSE", 
			"WHILE", "SKIPP", "ASSIGN", "OUT", "FOR", "DO", "ND", "ELSEIF", "LPAR", 
			"RPAR", "LBRACE", "RBRACE", "SEMICOLON", "COMMA", "ID", "WS"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, null, "'+'", "'-'", "'*'", "'/'", "'mod'", "'^'", "'&'", 
			"'|'", "'=='", "'!='", "'<='", "'>='", "'<'", "'>'", "'!'", "'if'", "'then'", 
			"'else'", "'while'", "'skip'", "'='", "'out'", "'for'", "'do'", "'nd'", 
			"'elseif'", "'('", "')'", "'{'", "'}'", "';'", "','"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "NAT", "BOOL", "PLUS", "MINUS", "MUL", "DIV", "MOD", "POW", "AND", 
			"OR", "EQQ", "NEQ", "LEQ", "GEQ", "LT", "GT", "NOT", "IF", "THEN", "ELSE", 
			"WHILE", "SKIPP", "ASSIGN", "OUT", "FOR", "DO", "ND", "ELSEIF", "LPAR", 
			"RPAR", "LBRACE", "RBRACE", "SEMICOLON", "COMMA", "ID", "WS"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}


	public ImpLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "Imp.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2&\u00cb\b\1\4\2\t"+
		"\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13"+
		"\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t \4!"+
		"\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\3\2\3\2\3\2\7\2O\n\2\f\2\16\2R\13\2\5\2"+
		"T\n\2\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\5\3_\n\3\3\4\3\4\3\5\3\5\3\6"+
		"\3\6\3\7\3\7\3\b\3\b\3\b\3\b\3\t\3\t\3\n\3\n\3\13\3\13\3\f\3\f\3\f\3\r"+
		"\3\r\3\r\3\16\3\16\3\16\3\17\3\17\3\17\3\20\3\20\3\21\3\21\3\22\3\22\3"+
		"\23\3\23\3\23\3\24\3\24\3\24\3\24\3\24\3\25\3\25\3\25\3\25\3\25\3\26\3"+
		"\26\3\26\3\26\3\26\3\26\3\27\3\27\3\27\3\27\3\27\3\30\3\30\3\31\3\31\3"+
		"\31\3\31\3\32\3\32\3\32\3\32\3\33\3\33\3\33\3\34\3\34\3\34\3\35\3\35\3"+
		"\35\3\35\3\35\3\35\3\35\3\36\3\36\3\37\3\37\3 \3 \3!\3!\3\"\3\"\3#\3#"+
		"\3$\6$\u00c1\n$\r$\16$\u00c2\3%\6%\u00c6\n%\r%\16%\u00c7\3%\3%\2\2&\3"+
		"\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\f\27\r\31\16\33\17\35\20\37"+
		"\21!\22#\23%\24\'\25)\26+\27-\30/\31\61\32\63\33\65\34\67\359\36;\37="+
		" ?!A\"C#E$G%I&\3\2\6\3\2\63;\3\2\62;\3\2c|\5\2\13\f\17\17\"\"\2\u00cf"+
		"\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2\2\2\r\3\2"+
		"\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2\2\27\3\2\2\2"+
		"\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3\2\2\2\2!\3\2\2\2\2#\3\2"+
		"\2\2\2%\3\2\2\2\2\'\3\2\2\2\2)\3\2\2\2\2+\3\2\2\2\2-\3\2\2\2\2/\3\2\2"+
		"\2\2\61\3\2\2\2\2\63\3\2\2\2\2\65\3\2\2\2\2\67\3\2\2\2\29\3\2\2\2\2;\3"+
		"\2\2\2\2=\3\2\2\2\2?\3\2\2\2\2A\3\2\2\2\2C\3\2\2\2\2E\3\2\2\2\2G\3\2\2"+
		"\2\2I\3\2\2\2\3S\3\2\2\2\5^\3\2\2\2\7`\3\2\2\2\tb\3\2\2\2\13d\3\2\2\2"+
		"\rf\3\2\2\2\17h\3\2\2\2\21l\3\2\2\2\23n\3\2\2\2\25p\3\2\2\2\27r\3\2\2"+
		"\2\31u\3\2\2\2\33x\3\2\2\2\35{\3\2\2\2\37~\3\2\2\2!\u0080\3\2\2\2#\u0082"+
		"\3\2\2\2%\u0084\3\2\2\2\'\u0087\3\2\2\2)\u008c\3\2\2\2+\u0091\3\2\2\2"+
		"-\u0097\3\2\2\2/\u009c\3\2\2\2\61\u009e\3\2\2\2\63\u00a2\3\2\2\2\65\u00a6"+
		"\3\2\2\2\67\u00a9\3\2\2\29\u00ac\3\2\2\2;\u00b3\3\2\2\2=\u00b5\3\2\2\2"+
		"?\u00b7\3\2\2\2A\u00b9\3\2\2\2C\u00bb\3\2\2\2E\u00bd\3\2\2\2G\u00c0\3"+
		"\2\2\2I\u00c5\3\2\2\2KT\7\62\2\2LP\t\2\2\2MO\t\3\2\2NM\3\2\2\2OR\3\2\2"+
		"\2PN\3\2\2\2PQ\3\2\2\2QT\3\2\2\2RP\3\2\2\2SK\3\2\2\2SL\3\2\2\2T\4\3\2"+
		"\2\2UV\7v\2\2VW\7t\2\2WX\7w\2\2X_\7g\2\2YZ\7h\2\2Z[\7c\2\2[\\\7n\2\2\\"+
		"]\7u\2\2]_\7g\2\2^U\3\2\2\2^Y\3\2\2\2_\6\3\2\2\2`a\7-\2\2a\b\3\2\2\2b"+
		"c\7/\2\2c\n\3\2\2\2de\7,\2\2e\f\3\2\2\2fg\7\61\2\2g\16\3\2\2\2hi\7o\2"+
		"\2ij\7q\2\2jk\7f\2\2k\20\3\2\2\2lm\7`\2\2m\22\3\2\2\2no\7(\2\2o\24\3\2"+
		"\2\2pq\7~\2\2q\26\3\2\2\2rs\7?\2\2st\7?\2\2t\30\3\2\2\2uv\7#\2\2vw\7?"+
		"\2\2w\32\3\2\2\2xy\7>\2\2yz\7?\2\2z\34\3\2\2\2{|\7@\2\2|}\7?\2\2}\36\3"+
		"\2\2\2~\177\7>\2\2\177 \3\2\2\2\u0080\u0081\7@\2\2\u0081\"\3\2\2\2\u0082"+
		"\u0083\7#\2\2\u0083$\3\2\2\2\u0084\u0085\7k\2\2\u0085\u0086\7h\2\2\u0086"+
		"&\3\2\2\2\u0087\u0088\7v\2\2\u0088\u0089\7j\2\2\u0089\u008a\7g\2\2\u008a"+
		"\u008b\7p\2\2\u008b(\3\2\2\2\u008c\u008d\7g\2\2\u008d\u008e\7n\2\2\u008e"+
		"\u008f\7u\2\2\u008f\u0090\7g\2\2\u0090*\3\2\2\2\u0091\u0092\7y\2\2\u0092"+
		"\u0093\7j\2\2\u0093\u0094\7k\2\2\u0094\u0095\7n\2\2\u0095\u0096\7g\2\2"+
		"\u0096,\3\2\2\2\u0097\u0098\7u\2\2\u0098\u0099\7m\2\2\u0099\u009a\7k\2"+
		"\2\u009a\u009b\7r\2\2\u009b.\3\2\2\2\u009c\u009d\7?\2\2\u009d\60\3\2\2"+
		"\2\u009e\u009f\7q\2\2\u009f\u00a0\7w\2\2\u00a0\u00a1\7v\2\2\u00a1\62\3"+
		"\2\2\2\u00a2\u00a3\7h\2\2\u00a3\u00a4\7q\2\2\u00a4\u00a5\7t\2\2\u00a5"+
		"\64\3\2\2\2\u00a6\u00a7\7f\2\2\u00a7\u00a8\7q\2\2\u00a8\66\3\2\2\2\u00a9"+
		"\u00aa\7p\2\2\u00aa\u00ab\7f\2\2\u00ab8\3\2\2\2\u00ac\u00ad\7g\2\2\u00ad"+
		"\u00ae\7n\2\2\u00ae\u00af\7u\2\2\u00af\u00b0\7g\2\2\u00b0\u00b1\7k\2\2"+
		"\u00b1\u00b2\7h\2\2\u00b2:\3\2\2\2\u00b3\u00b4\7*\2\2\u00b4<\3\2\2\2\u00b5"+
		"\u00b6\7+\2\2\u00b6>\3\2\2\2\u00b7\u00b8\7}\2\2\u00b8@\3\2\2\2\u00b9\u00ba"+
		"\7\177\2\2\u00baB\3\2\2\2\u00bb\u00bc\7=\2\2\u00bcD\3\2\2\2\u00bd\u00be"+
		"\7.\2\2\u00beF\3\2\2\2\u00bf\u00c1\t\4\2\2\u00c0\u00bf\3\2\2\2\u00c1\u00c2"+
		"\3\2\2\2\u00c2\u00c0\3\2\2\2\u00c2\u00c3\3\2\2\2\u00c3H\3\2\2\2\u00c4"+
		"\u00c6\t\5\2\2\u00c5\u00c4\3\2\2\2\u00c6\u00c7\3\2\2\2\u00c7\u00c5\3\2"+
		"\2\2\u00c7\u00c8\3\2\2\2\u00c8\u00c9\3\2\2\2\u00c9\u00ca\b%\2\2\u00ca"+
		"J\3\2\2\2\b\2PS^\u00c2\u00c7\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}