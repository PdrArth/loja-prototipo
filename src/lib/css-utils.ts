/**
 * Utilitários para manipulação de CSS e classes
 */

/**
 * Combina classes CSS condicionalmente (similar ao clsx)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Combina classes CSS com condições
 */
export function classNames(
  base: string,
  conditions: Record<string, boolean>
): string {
  const conditionalClasses = Object.entries(conditions)
    .filter(([, condition]) => condition)
    .map(([className]) => className);
  
  return [base, ...conditionalClasses].join(' ');
}

/**
 * Gera classes responsivas para Tailwind CSS
 */
export function responsive(
  mobile: string,
  tablet?: string,
  desktop?: string
): string {
  const classes = [mobile];
  
  if (tablet) {
    classes.push(`md:${tablet}`);
  }
  
  if (desktop) {
    classes.push(`lg:${desktop}`);
  }
  
  return classes.join(' ');
}