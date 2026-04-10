import { colors } from "./colors";
import { portfolio } from "./portfolio";
import { spacing } from "./spacing";
import { typography } from "./typography";

export { colors, portfolio, spacing, typography };

const buildPortfolioColorVariables = (themeColors) => ({
  "--portfolio-color-canvas": themeColors.canvas,
  "--portfolio-color-bg-soft": themeColors.bgSoft,
  "--portfolio-color-bg-pure": themeColors.bgPure,
  "--portfolio-color-surface": themeColors.surface,
  "--portfolio-color-surface-warm": themeColors.surfaceWarm,
  "--portfolio-color-surface-raised": themeColors.surfaceRaised,
  "--portfolio-color-text-title": themeColors.textTitle,
  "--portfolio-color-text-body": themeColors.textBody,
  "--portfolio-color-text-muted": themeColors.textMuted,
  "--portfolio-color-text-subtle": themeColors.textSubtle,
  "--portfolio-color-text-inverted": themeColors.textInverted,
  "--portfolio-color-border-light": themeColors.borderLight,
  "--portfolio-color-border-strong": themeColors.borderStrong,
  "--portfolio-color-accent-brand": themeColors.accentBrand,
  "--portfolio-color-accent-moss": themeColors.accentMoss,
  "--portfolio-color-accent-blue": themeColors.accentBlue,
  "--portfolio-color-accent-ochre": themeColors.accentOchre,
});

const portfolioSharedCssVariables = {
  "--portfolio-font-title": portfolio.typography.families.title,
  "--portfolio-font-body": portfolio.typography.families.body,
  "--portfolio-font-label": portfolio.typography.families.label,
  "--portfolio-font-mono": portfolio.typography.families.mono,
  "--portfolio-type-hero-size": portfolio.typography.scales.hero.size,
  "--portfolio-type-hero-line": portfolio.typography.scales.hero.lineHeight,
  "--portfolio-type-hero-weight": portfolio.typography.scales.hero.weight,
  "--portfolio-type-section-title-size":
    portfolio.typography.scales.sectionTitle.size,
  "--portfolio-type-section-title-line":
    portfolio.typography.scales.sectionTitle.lineHeight,
  "--portfolio-type-section-title-weight":
    portfolio.typography.scales.sectionTitle.weight,
  "--portfolio-type-body-size": portfolio.typography.scales.body.size,
  "--portfolio-type-body-line": portfolio.typography.scales.body.lineHeight,
  "--portfolio-type-body-weight": portfolio.typography.scales.body.weight,
  "--portfolio-type-body-letter-spacing":
    portfolio.typography.scales.body.letterSpacing,
  "--portfolio-type-label-size": portfolio.typography.scales.label.size,
  "--portfolio-type-label-line": portfolio.typography.scales.label.lineHeight,
  "--portfolio-type-label-weight":
    portfolio.typography.scales.label.weight,
  "--portfolio-type-body-sm-size": portfolio.typography.scales.bodySm.size,
  "--portfolio-type-body-sm-line":
    portfolio.typography.scales.bodySm.lineHeight,
  "--portfolio-type-body-sm-weight":
    portfolio.typography.scales.bodySm.weight,
  "--portfolio-type-body-sm-letter-spacing":
    portfolio.typography.scales.bodySm.letterSpacing,
  "--portfolio-type-caption-size": portfolio.typography.scales.caption.size,
  "--portfolio-type-caption-line":
    portfolio.typography.scales.caption.lineHeight,
  "--portfolio-type-caption-weight":
    portfolio.typography.scales.caption.weight,
  "--portfolio-space-2xs": portfolio.spacing["2xs"],
  "--portfolio-space-xs": portfolio.spacing.xs,
  "--portfolio-space-sm": portfolio.spacing.sm,
  "--portfolio-space-md": portfolio.spacing.md,
  "--portfolio-space-lg": portfolio.spacing.lg,
  "--portfolio-space-section-y": portfolio.spacing.sectionPaddingY,
  "--portfolio-radius-sm": portfolio.radius.sm,
  "--portfolio-radius-md": portfolio.radius.md,
  "--portfolio-radius-lg": portfolio.radius.lg,
  "--portfolio-radius-hero": portfolio.radius.hero,
  "--portfolio-shadow-card": portfolio.shadows.card,
  "--portfolio-layout-page-gutter": portfolio.layout.pageGutter,
  "--portfolio-layout-content-width": portfolio.layout.contentWidth,
  "--portfolio-layout-hero-width": portfolio.layout.heroWidth,
  "--portfolio-semantic-section-background":
    portfolio.semantics.sectionBackground,
  "--portfolio-semantic-media-frame-background":
    portfolio.semantics.mediaFrameBackground,
  "--portfolio-semantic-media-frame-border":
    portfolio.semantics.mediaFrameBorder,
  "--portfolio-semantic-eyebrow-color": portfolio.semantics.eyebrowColor,
  "--portfolio-semantic-caption-color": portfolio.semantics.captionColor,
  "--portfolio-semantic-body-color": portfolio.semantics.bodyColor,
  "--portfolio-semantic-title-color": portfolio.semantics.titleColor,
  "--portfolio-work-border-width": portfolio.work.borderWidth,
  "--portfolio-work-inner-radius-offset": portfolio.work.innerRadiusOffset,
  "--portfolio-work-page-header-title-size":
    portfolio.work.pageHeader.titleSize,
  "--portfolio-work-page-header-title-letter-spacing":
    portfolio.work.pageHeader.titleLetterSpacing,
  "--portfolio-work-page-header-title-line-height":
    portfolio.work.pageHeader.titleLineHeight,
  "--portfolio-work-page-header-mobile-title-size":
    portfolio.work.pageHeader.mobileTitleSize,
  "--portfolio-work-tabs-min-height": portfolio.work.tabs.minHeight,
  "--portfolio-work-tabs-padding-block": portfolio.work.tabs.paddingBlock,
  "--portfolio-work-tabs-padding-inline": portfolio.work.tabs.paddingInline,
  "--portfolio-work-tabs-radius": portfolio.work.tabs.radius,
  "--portfolio-work-tabs-focus-outline-width":
    portfolio.work.tabs.focusOutlineWidth,
  "--portfolio-work-tabs-focus-outline-offset":
    portfolio.work.tabs.focusOutlineOffset,
  "--portfolio-work-project-card-padding": portfolio.work.projectCard.padding,
  "--portfolio-work-project-preview-radius":
    portfolio.work.projectCard.previewRadius,
  "--portfolio-work-project-preview-overlay-radius":
    portfolio.work.projectCard.previewOverlayRadius,
  "--portfolio-work-project-title-size":
    portfolio.work.projectCard.titleSize,
  "--portfolio-work-project-title-line-height":
    portfolio.work.projectCard.titleLineHeight,
  "--portfolio-work-project-summary-line-height":
    portfolio.work.projectCard.summaryLineHeight,
  "--portfolio-work-project-transition-duration":
    portfolio.work.projectCard.transitionDuration,
  "--portfolio-work-project-hover-translate-y":
    portfolio.work.projectCard.hoverTranslateY,
  "--portfolio-work-project-mobile-padding":
    portfolio.work.projectCard.mobilePadding,
  "--portfolio-work-project-mobile-radius":
    portfolio.work.projectCard.mobileRadius,
  "--portfolio-work-project-mobile-title-size":
    portfolio.work.projectCard.mobileTitleSize,
  "--portfolio-work-project-mobile-title-line-height":
    portfolio.work.projectCard.mobileTitleLineHeight,
  "--portfolio-work-project-mobile-summary-size":
    portfolio.work.projectCard.mobileSummarySize,
  "--portfolio-work-project-mobile-summary-line-height":
    portfolio.work.projectCard.mobileSummaryLineHeight,
  "--portfolio-work-tag-border-width": portfolio.work.tag.borderWidth,
  "--portfolio-work-tag-radius": portfolio.work.tag.radius,
  "--portfolio-work-tag-min-height": portfolio.work.tag.minHeight,
  "--portfolio-work-tag-padding-block": portfolio.work.tag.paddingBlock,
  "--portfolio-work-tag-padding-inline": portfolio.work.tag.paddingInline,
  "--portfolio-work-tag-line-height": portfolio.work.tag.lineHeight,
  "--portfolio-work-exploration-card-feature-min-height":
    portfolio.work.exploration.cardFeatureMinHeight,
  "--portfolio-work-exploration-card-compact-min-height":
    portfolio.work.exploration.cardCompactMinHeight,
  "--portfolio-work-exploration-card-padding-feature-block":
    portfolio.work.exploration.cardPaddingFeatureBlock,
  "--portfolio-work-exploration-card-padding-feature-inline":
    portfolio.work.exploration.cardPaddingFeatureInline,
  "--portfolio-work-exploration-card-padding-compact-block":
    portfolio.work.exploration.cardPaddingCompactBlock,
  "--portfolio-work-exploration-card-padding-compact-inline":
    portfolio.work.exploration.cardPaddingCompactInline,
  "--portfolio-work-exploration-card-tall-min-height":
    portfolio.work.exploration.cardTallMinHeight,
  "--portfolio-work-exploration-card-tall-image-min-height":
    portfolio.work.exploration.cardTallImageMinHeight,
  "--portfolio-work-exploration-earnings-height":
    portfolio.work.exploration.earningsHeight,
  "--portfolio-work-exploration-earnings-radius":
    portfolio.work.exploration.earningsRadius,
  "--portfolio-work-exploration-earnings-visual-max-width":
    portfolio.work.exploration.earningsVisualMaxWidth,
  "--portfolio-work-exploration-earnings-orb-width":
    portfolio.work.exploration.earningsOrbWidth,
  "--portfolio-work-exploration-earnings-orb-aspect-ratio":
    portfolio.work.exploration.earningsOrbAspectRatio,
  "--portfolio-work-exploration-earnings-orb-inset-top":
    portfolio.work.exploration.earningsOrbInsetTop,
  "--portfolio-work-exploration-earnings-orb-inset-left":
    portfolio.work.exploration.earningsOrbInsetLeft,
  "--portfolio-work-exploration-earnings-glow-width":
    portfolio.work.exploration.earningsGlowWidth,
  "--portfolio-work-exploration-earnings-glow-height":
    portfolio.work.exploration.earningsGlowHeight,
  "--portfolio-work-exploration-earnings-glow-blur":
    portfolio.work.exploration.earningsGlowBlur,
  "--portfolio-work-exploration-earnings-glow-inset-top":
    portfolio.work.exploration.earningsGlowInsetTop,
  "--portfolio-work-exploration-earnings-glow-inset-left":
    portfolio.work.exploration.earningsGlowInsetLeft,
  "--portfolio-work-exploration-earnings-content-max-width":
    portfolio.work.exploration.earningsContentMaxWidth,
  "--portfolio-work-exploration-earnings-content-side-inset":
    portfolio.work.exploration.earningsContentSideInset,
  "--portfolio-work-exploration-earnings-header-gap":
    portfolio.work.exploration.earningsHeaderGap,
  "--portfolio-work-exploration-earnings-label-size":
    portfolio.work.exploration.earningsLabelSize,
  "--portfolio-work-exploration-earnings-label-line-height":
    portfolio.work.exploration.earningsLabelLineHeight,
  "--portfolio-work-exploration-earnings-amount-size":
    portfolio.work.exploration.earningsAmountSize,
  "--portfolio-work-exploration-device-max-width":
    portfolio.work.exploration.deviceMaxWidth,
  "--portfolio-work-exploration-cloud-frame-size":
    portfolio.work.exploration.cloudFrameSize,
  "--portfolio-work-exploration-cloud-asset-inset-top":
    portfolio.work.exploration.cloudAssetInsetTop,
  "--portfolio-work-exploration-cloud-asset-inset-right":
    portfolio.work.exploration.cloudAssetInsetRight,
  "--portfolio-work-exploration-cloud-asset-inset-bottom":
    portfolio.work.exploration.cloudAssetInsetBottom,
  "--portfolio-work-exploration-cloud-asset-inset-left":
    portfolio.work.exploration.cloudAssetInsetLeft,
  "--portfolio-work-exploration-list-composition-height":
    portfolio.work.exploration.listCompositionHeight,
  "--portfolio-work-exploration-list-size":
    portfolio.work.exploration.listSize,
  "--portfolio-work-exploration-list-top-shadow-height":
    portfolio.work.exploration.listTopShadowHeight,
  "--portfolio-work-exploration-list-top-shadow-inset-top":
    portfolio.work.exploration.listTopShadowInsetTop,
  "--portfolio-work-exploration-list-top-shadow-asset-inset-top":
    portfolio.work.exploration.listTopShadowAssetInsetTop,
  "--portfolio-work-exploration-list-top-shadow-asset-inset-right":
    portfolio.work.exploration.listTopShadowAssetInsetRight,
  "--portfolio-work-exploration-list-top-shadow-asset-inset-bottom":
    portfolio.work.exploration.listTopShadowAssetInsetBottom,
  "--portfolio-work-exploration-list-top-shadow-asset-inset-left":
    portfolio.work.exploration.listTopShadowAssetInsetLeft,
  "--portfolio-work-exploration-list-bottom-shadow-height":
    portfolio.work.exploration.listBottomShadowHeight,
  "--portfolio-work-exploration-list-bottom-shadow-inset-top":
    portfolio.work.exploration.listBottomShadowInsetTop,
  "--portfolio-work-exploration-list-bottom-shadow-width":
    portfolio.work.exploration.listBottomShadowWidth,
  "--portfolio-work-exploration-list-bottom-shadow-asset-inset-top":
    portfolio.work.exploration.listBottomShadowAssetInsetTop,
  "--portfolio-work-exploration-list-bottom-shadow-asset-inset-right":
    portfolio.work.exploration.listBottomShadowAssetInsetRight,
  "--portfolio-work-exploration-list-bottom-shadow-asset-inset-bottom":
    portfolio.work.exploration.listBottomShadowAssetInsetBottom,
  "--portfolio-work-exploration-list-bottom-shadow-asset-inset-left":
    portfolio.work.exploration.listBottomShadowAssetInsetLeft,
  "--portfolio-work-exploration-list-phone-width":
    portfolio.work.exploration.listPhoneWidth,
  "--portfolio-work-exploration-list-phone-height":
    portfolio.work.exploration.listPhoneHeight,
  "--portfolio-work-exploration-list-phone-inset-left":
    portfolio.work.exploration.listPhoneInsetLeft,
  "--portfolio-work-exploration-list-phone-radius":
    portfolio.work.exploration.listPhoneRadius,
  "--portfolio-work-exploration-list-phone-surface-height":
    portfolio.work.exploration.listPhoneSurfaceHeight,
  "--portfolio-work-exploration-list-phone-surface-inset-left":
    portfolio.work.exploration.listPhoneSurfaceInsetLeft,
  "--portfolio-work-exploration-list-items-inset-left":
    portfolio.work.exploration.listItemsInsetLeft,
  "--portfolio-work-exploration-list-items-inset-top":
    portfolio.work.exploration.listItemsInsetTop,
  "--portfolio-work-exploration-list-items-width":
    portfolio.work.exploration.listItemsWidth,
  "--portfolio-work-exploration-list-items-gap":
    portfolio.work.exploration.listItemsGap,
  "--portfolio-work-exploration-list-line-height":
    portfolio.work.exploration.listLineHeight,
  "--portfolio-work-exploration-list-line-radius":
    portfolio.work.exploration.listLineRadius,
  "--portfolio-work-exploration-list-button-width":
    portfolio.work.exploration.listButtonWidth,
  "--portfolio-work-exploration-ticket-max-width":
    portfolio.work.exploration.ticketMaxWidth,
  "--portfolio-work-exploration-ticket-aspect-ratio":
    portfolio.work.exploration.ticketAspectRatio,
  "--portfolio-work-exploration-immersive-aspect-ratio":
    portfolio.work.exploration.immersiveAspectRatio,
  "--portfolio-work-exploration-blur-scale":
    portfolio.work.exploration.blurScale,
  "--portfolio-work-exploration-mobile-feature-padding-block":
    portfolio.work.exploration.mobileFeaturePaddingBlock,
  "--portfolio-work-exploration-mobile-feature-padding-inline":
    portfolio.work.exploration.mobileFeaturePaddingInline,
  "--portfolio-work-exploration-mobile-compact-padding-block":
    portfolio.work.exploration.mobileCompactPaddingBlock,
  "--portfolio-work-exploration-mobile-compact-padding-inline":
    portfolio.work.exploration.mobileCompactPaddingInline,
  "--portfolio-work-exploration-mobile-tall-min-height":
    portfolio.work.exploration.mobileTallMinHeight,
  "--portfolio-work-exploration-mobile-earnings-height":
    portfolio.work.exploration.mobileEarningsHeight,
  "--portfolio-work-exploration-mobile-earnings-radius":
    portfolio.work.exploration.mobileEarningsRadius,
  "--portfolio-work-exploration-mobile-earnings-content-side-inset":
    portfolio.work.exploration.mobileEarningsContentSideInset,
  "--portfolio-work-exploration-mobile-earnings-label-size":
    portfolio.work.exploration.mobileEarningsLabelSize,
  "--portfolio-work-exploration-mobile-earnings-amount-size":
    portfolio.work.exploration.mobileEarningsAmountSize,
  "--portfolio-work-exploration-mobile-list-size":
    portfolio.work.exploration.mobileListSize,
  "--portfolio-work-exploration-mobile-list-scale":
    portfolio.work.exploration.mobileListScale,
  "--portfolio-work-exploration-earnings-surface":
    portfolio.work.exploration.earningsSurface,
  "--portfolio-work-exploration-earnings-inset-shadow":
    portfolio.work.exploration.earningsInsetShadow,
  "--portfolio-work-exploration-earnings-glow-color":
    portfolio.work.exploration.earningsGlowColor,
  "--portfolio-work-exploration-earnings-highlight":
    portfolio.work.exploration.earningsHighlight,
  "--portfolio-work-exploration-earnings-label-color":
    portfolio.work.exploration.earningsLabelColor,
  "--portfolio-work-exploration-list-gradient":
    portfolio.work.exploration.listGradient,
  "--portfolio-work-side-project-padding": portfolio.work.sideProject.padding,
  "--portfolio-work-side-project-title-size":
    portfolio.work.sideProject.titleSize,
  "--portfolio-work-side-project-title-line-height":
    portfolio.work.sideProject.titleLineHeight,
  "--portfolio-work-side-project-body-line-height":
    portfolio.work.sideProject.bodyLineHeight,
  "--portfolio-work-side-project-transition-duration":
    portfolio.work.sideProject.transitionDuration,
  "--portfolio-work-side-project-hover-translate-y":
    portfolio.work.sideProject.hoverTranslateY,
  "--portfolio-work-side-project-hover-path-shift-x":
    portfolio.work.sideProject.hoverPathShiftX,
  "--portfolio-work-side-project-focus-outline-width":
    portfolio.work.sideProject.focusOutlineWidth,
  "--portfolio-work-side-project-focus-outline-offset":
    portfolio.work.sideProject.focusOutlineOffset,
  "--portfolio-work-side-project-mobile-padding":
    portfolio.work.sideProject.mobilePadding,
  "--portfolio-work-side-project-mobile-gap":
    portfolio.work.sideProject.mobileGap,
};

// 作品集主题只在站点层按需接入，不直接污染 design-system 预览页。
export const portfolioLightCssVariables = {
  ...buildPortfolioColorVariables(portfolio.colorThemes.light),
  ...portfolioSharedCssVariables,
};

export const portfolioDarkCssVariables = {
  ...buildPortfolioColorVariables(portfolio.colorThemes.dark),
  ...portfolioSharedCssVariables,
};

export const portfolioThemeCssVariables = Object.freeze({
  light: portfolioLightCssVariables,
  dark: portfolioDarkCssVariables,
});

// 为了不破坏现有页面，默认仍然导出 light 主题变量。
export const portfolioCssVariables = portfolioLightCssVariables;

// 把 token 同步成全局 CSS 变量，这样组件样式和预览页面都能共用同一份设计值。
export const rootCssVariables = {
  "--ds-color-canvas": colors.canvas,
  "--ds-color-surface": colors.surface,
  "--ds-color-surface-soft": colors.surfaceSoft,
  "--ds-color-surface-muted": colors.surfaceMuted,
  "--ds-color-ink": colors.ink,
  "--ds-color-ink-soft": colors.inkSoft,
  "--ds-color-text": colors.text,
  "--ds-color-text-support": colors.textSupport,
  "--ds-color-text-muted": colors.textMuted,
  "--ds-color-text-subtle": colors.textSubtle,
  "--ds-color-border": colors.border,
  "--ds-color-border-soft": colors.borderSoft,
  "--ds-color-border-muted": colors.borderMuted,
  "--ds-color-accent-sky": colors.accentSky,
  "--ds-color-accent-blush": colors.accentBlush,
  "--ds-color-accent-sand": colors.accentSand,
  "--ds-space-2xs": spacing["2xs"],
  "--ds-space-xs": spacing.xs,
  "--ds-space-sm": spacing.sm,
  "--ds-space-md": spacing.md,
  "--ds-space-lg": spacing.lg,
  "--ds-space-xl": spacing.xl,
  "--ds-space-2xl": spacing["2xl"],
  "--ds-space-3xl": spacing["3xl"],
  "--ds-space-section": spacing.section,
  "--ds-space-hero": spacing.hero,
  "--ds-font-display": typography.families.display,
  "--ds-font-ui": typography.families.ui,
  "--ds-font-body": typography.families.body,
  "--ds-type-display-size": typography.scales.display.size,
  "--ds-type-display-line": typography.scales.display.lineHeight,
  "--ds-type-display-weight": typography.scales.display.weight,
  "--ds-type-heading-lg-size": typography.scales.headingLg.size,
  "--ds-type-heading-lg-line": typography.scales.headingLg.lineHeight,
  "--ds-type-heading-lg-weight": typography.scales.headingLg.weight,
  "--ds-type-heading-md-size": typography.scales.headingMd.size,
  "--ds-type-heading-md-line": typography.scales.headingMd.lineHeight,
  "--ds-type-heading-md-weight": typography.scales.headingMd.weight,
  "--ds-type-heading-sm-size": typography.scales.headingSm.size,
  "--ds-type-heading-sm-line": typography.scales.headingSm.lineHeight,
  "--ds-type-heading-sm-weight": typography.scales.headingSm.weight,
  "--ds-type-body-lg-size": typography.scales.bodyLg.size,
  "--ds-type-body-lg-line": typography.scales.bodyLg.lineHeight,
  "--ds-type-body-lg-weight": typography.scales.bodyLg.weight,
  "--ds-type-body-sm-size": typography.scales.bodySm.size,
  "--ds-type-body-sm-line": typography.scales.bodySm.lineHeight,
  "--ds-type-body-sm-weight": typography.scales.bodySm.weight,
  "--ds-type-label-size": typography.scales.label.size,
  "--ds-type-label-line": typography.scales.label.lineHeight,
  "--ds-type-label-weight": typography.scales.label.weight,
  "--ds-type-overline-size": typography.scales.overline.size,
  "--ds-type-overline-line": typography.scales.overline.lineHeight,
  "--ds-type-overline-weight": typography.scales.overline.weight,
  "--ds-radius-sm": "0.75rem",
  "--ds-radius-md": "1rem",
  "--ds-radius-lg": "1.5rem",
  "--ds-radius-xl": "1.75rem",
  "--ds-radius-pill": "999px",
  "--ds-shadow-soft": "0 18px 40px rgba(20, 24, 27, 0.06)",
  "--ds-shadow-edge": "inset 0 0 0 1px rgba(227, 229, 232, 1)",
};
