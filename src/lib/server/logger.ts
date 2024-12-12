import envPaths from 'env-paths';
import winston from 'winston';

export class Logger {
	public static readonly Instance = new Logger();

	private logger: winston.Logger;

	private constructor() {
        const paths = envPaths('ptw-evaluation-assist');
        const logPath = paths.log;
		this.logger = winston.createLogger({
			level: 'info',
			format: winston.format.json(),
			transports: [
				new winston.transports.Console({ level: 'info' }),
				new winston.transports.File({ filename: `${logPath}/error.log`, level: 'error' }),
                new winston.transports.File({ filename: `${logPath}/combined.log` })
			]
		});
	}

    public info(message: string, ...meta: unknown[]) {
        this.logger.info(message, meta);
    }

    public error(message: string, ...meta: unknown[]) {
        this.logger.error(message, meta);
    }
}
