import os
from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    ContextTypes,
    filters,
)

TOKEN = os.getenv("BOT_TOKEN")


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "👋 Baga nagaan dhuftan gara Abdii Market! 🛍️\n\n"
        "Meeshaa barbaaddan maqaa isaa nuuf ergaa.\n"
        "💰 Gatii fi odeeffannoo isaa isinif deebifna.\n\n"
        "📦 Order gochuuf message nuuf ergaa."
    )


async def automatic_reply(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "👋 Galatoomi! Abdii Market isin simata. 🛍️\n\n"
        "📦 Meeshaa barbaaddan maqaa isaa nuuf ergaa.\n"
        "💰 Gatii fi odeeffannoo isaa isinif deebifna.\n\n"
        "👤 Order yoo gootu:\n"
        "• Maqaa kee\n"
        "• Lakkoofsa bilbilaa\n"
        "• Bakka itti geessan\n\n"
        "🙏 Galatoomi!"
    )


def main():
    if not TOKEN:
        raise ValueError("BOT_TOKEN hin argamne!")

    app = Application.builder().token(TOKEN).build()

    app.add_handler(CommandHandler("start", start))

    app.add_handler(
        MessageHandler(
            filters.TEXT & ~filters.COMMAND,
            automatic_reply
        )
    )

    print("🤖 Abdii Market Bot running...")

    app.run_polling()


if __name__ == "__main__":
    main()
