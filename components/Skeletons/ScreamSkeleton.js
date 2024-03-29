import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-content';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

function ScreamSkeleton(props) {
	const { isDarkTheme } = useSelector((state) => state.user);
	return (
		<View
			style={{
				...styles.card,
				backgroundColor :
					isDarkTheme ? '#404040' :
					'white'
			}}
		>
			<View style={{ ...styles.row }}>
				<SkeletonPlaceholder
					boneColor={

							isDarkTheme ? '#121212' :
							'#E1E9EE'
					}
					highlightColor={

							isDarkTheme ? '#333333' :
							'#F2F8FC'
					}
					isLoading={props.loading}
					containerStyle={{ alignSelf: 'flex-start', marginRight: 20 }}
					layout={[
						{ key: 1, width: 80, height: 80, borderRadius: 40 }
					]}
				/>
				<SkeletonPlaceholder
					boneColor={

							isDarkTheme ? '#121212' :
							'#E1E9EE'
					}
					highlightColor={

							isDarkTheme ? '#333333' :
							'#F2F8FC'
					}
					isLoading={props.loading}
					containerStyle={{ alignItems: 'flex-start', marginTop: 20 }}
					layout={[
						{ key: 1, width: 110, height: 25 },
						{ key: 2, width: 70, height: 15, marginTop: 5 }
					]}
				/>
			</View>
			<View
				style={{
					...styles.row,
					marginTop      : 10,
					justifyContent : 'flex-start'
				}}
			>
				<SkeletonPlaceholder
					boneColor={

							isDarkTheme ? '#121212' :
							'#E1E9EE'
					}
					highlightColor={

							isDarkTheme ? '#333333' :
							'#F2F8FC'
					}
					isLoading={props.loading}
					layout={[
						{ key: 1, width: '100%', height: 10, marginBottom: 5 },
						{ key: 2, width: '100%', height: 10, marginBottom: 5 },
						{ key: 3, width: '100%', height: 10, marginBottom: 5 }
					]}
				/>
			</View>
			<View style={{ ...styles.row, width: '100%', marginTop: 5 }}>
				<SkeletonPlaceholder
					boneColor={

							isDarkTheme ? '#121212' :
							'#E1E9EE'
					}
					highlightColor={

							isDarkTheme ? '#333333' :
							'#F2F8FC'
					}
					isLoading={props.loading}
					containerStyle={{ flexDirection: 'row' }}
					layout={[
						{ key: 1, width: '40%', height: 40, marginRight: 15 },
						{ key: 2, width: '40%', height: 40 }
					]}
				/>
			</View>
		</View>

		// </SkeletonPlaceholder>
	);
}

const styles = StyleSheet.create({
	card : {
		width         : '90%',
		shadowColor   : 'black',
		shadowOffset  : { width: 1, height: 2 },
		shadowOpacity : 0.26,
		shadowRadius  : 8,
		elevation     : 2,
		borderRadius  : 10,
		// backgroundColor : 'white',
		height        : 250,
		margin        : 20,
		padding       : 20
	},
	row  : {
		flexDirection : 'row'
	}
});

export default ScreamSkeleton;
