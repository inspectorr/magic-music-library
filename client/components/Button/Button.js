import cn from 'classnames';

function Button({
  className,
  waiting,
  ...props
}) {
  return (
    <button
      className={cn('button', className)}
      {...props}
    />
  );
}

export default Button;
