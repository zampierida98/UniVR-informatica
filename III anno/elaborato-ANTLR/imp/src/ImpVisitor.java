// Generated from C:/Users/Davide/Desktop/progetto_linguaggi/imp/src\Imp.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.tree.ParseTreeVisitor;

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by {@link ImpParser}.
 *
 * @param <T> The return type of the visit operation. Use {@link Void} for
 * operations with no return type.
 */
public interface ImpVisitor<T> extends ParseTreeVisitor<T> {
	/**
	 * Visit a parse tree produced by {@link ImpParser#prog}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitProg(ImpParser.ProgContext ctx);
	/**
	 * Visit a parse tree produced by the {@code doWhile}
	 * labeled alternative in {@link ImpParser#com}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDoWhile(ImpParser.DoWhileContext ctx);
	/**
	 * Visit a parse tree produced by the {@code nd}
	 * labeled alternative in {@link ImpParser#com}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNd(ImpParser.NdContext ctx);
	/**
	 * Visit a parse tree produced by the {@code for}
	 * labeled alternative in {@link ImpParser#com}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFor(ImpParser.ForContext ctx);
	/**
	 * Visit a parse tree produced by the {@code skip}
	 * labeled alternative in {@link ImpParser#com}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSkip(ImpParser.SkipContext ctx);
	/**
	 * Visit a parse tree produced by the {@code while}
	 * labeled alternative in {@link ImpParser#com}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitWhile(ImpParser.WhileContext ctx);
	/**
	 * Visit a parse tree produced by the {@code if}
	 * labeled alternative in {@link ImpParser#com}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIf(ImpParser.IfContext ctx);
	/**
	 * Visit a parse tree produced by the {@code seq}
	 * labeled alternative in {@link ImpParser#com}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSeq(ImpParser.SeqContext ctx);
	/**
	 * Visit a parse tree produced by the {@code assign}
	 * labeled alternative in {@link ImpParser#com}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAssign(ImpParser.AssignContext ctx);
	/**
	 * Visit a parse tree produced by the {@code out}
	 * labeled alternative in {@link ImpParser#com}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitOut(ImpParser.OutContext ctx);
	/**
	 * Visit a parse tree produced by the {@code elseif}
	 * labeled alternative in {@link ImpParser#elseifElse}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitElseif(ImpParser.ElseifContext ctx);
	/**
	 * Visit a parse tree produced by the {@code else}
	 * labeled alternative in {@link ImpParser#elseifElse}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitElse(ImpParser.ElseContext ctx);
	/**
	 * Visit a parse tree produced by the {@code nat}
	 * labeled alternative in {@link ImpParser#exp}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNat(ImpParser.NatContext ctx);
	/**
	 * Visit a parse tree produced by the {@code divMulMod}
	 * labeled alternative in {@link ImpParser#exp}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDivMulMod(ImpParser.DivMulModContext ctx);
	/**
	 * Visit a parse tree produced by the {@code not}
	 * labeled alternative in {@link ImpParser#exp}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNot(ImpParser.NotContext ctx);
	/**
	 * Visit a parse tree produced by the {@code plusMinus}
	 * labeled alternative in {@link ImpParser#exp}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPlusMinus(ImpParser.PlusMinusContext ctx);
	/**
	 * Visit a parse tree produced by the {@code eqExp}
	 * labeled alternative in {@link ImpParser#exp}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEqExp(ImpParser.EqExpContext ctx);
	/**
	 * Visit a parse tree produced by the {@code bool}
	 * labeled alternative in {@link ImpParser#exp}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBool(ImpParser.BoolContext ctx);
	/**
	 * Visit a parse tree produced by the {@code cmpExp}
	 * labeled alternative in {@link ImpParser#exp}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCmpExp(ImpParser.CmpExpContext ctx);
	/**
	 * Visit a parse tree produced by the {@code logicExp}
	 * labeled alternative in {@link ImpParser#exp}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLogicExp(ImpParser.LogicExpContext ctx);
	/**
	 * Visit a parse tree produced by the {@code parExp}
	 * labeled alternative in {@link ImpParser#exp}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitParExp(ImpParser.ParExpContext ctx);
	/**
	 * Visit a parse tree produced by the {@code pow}
	 * labeled alternative in {@link ImpParser#exp}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPow(ImpParser.PowContext ctx);
	/**
	 * Visit a parse tree produced by the {@code id}
	 * labeled alternative in {@link ImpParser#exp}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitId(ImpParser.IdContext ctx);
}